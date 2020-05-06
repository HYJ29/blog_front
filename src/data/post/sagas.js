import { put, select } from "redux-saga/effects";

import { actions, selectors } from "data";
import api from "api";
import { getTitlePhotoFrom, getPostInfoFrom } from "./helper";

export function* createPost() {
  try {
    const editorState = yield select(selectors.editorState.getEditorState);
    const UserId = yield select(selectors.user.getUserId);
    const titlePhotoUrl = getTitlePhotoFrom(editorState);
    const { title: titleInfo, subTitle: subTitleInfo } = getPostInfoFrom(
      editorState
    );
    console.log("titleInfo", titleInfo);
    console.log("subTitleInfo", subTitleInfo);
    yield put(actions.editorState.setTitlePhoto(titlePhotoUrl));
    yield put(actions.editorState.setTitle(titleInfo));
    yield put(actions.editorState.setSubTitle(subTitleInfo));

    const title = yield select(selectors.editorState.getTitle);
    const subTitle = yield select(selectors.editorState.getSubTitle);
    const titlePhoto = yield select(selectors.editorState.getTitlePhoto);
    console.log("title", title);
    console.log("subTitle", subTitle);

    const postStates = {
      editorState,
      UserId,
      title,
      subTitle,
      titlePhoto
    };
    const res = yield api.postApi.createPost(postStates);
    const { createdPostId } = res.data;
    yield put(actions.post.getOnePostDetail(createdPostId));
    yield put(actions.modal.modalUpAndGo("published"));
  } catch (error) {
    console.log("error", error);
  }
}

export function* getOnePost(action) {
  try {
    const { postId } = action;
    yield put(actions.post.getOnePostLoading());
    const post = yield api.postApi.getPostById(postId);
    yield put(actions.post.getOnePostSuccess(post));
  } catch (error) {
    console.log("error", error);
    yield put(actions.post.getOnePostFailure(error));
  }
}

export function* getOnePostDetail(action) {
  const { postId } = action;
  yield put(actions.editorState.setEditorType("detail"));
  yield put(actions.editorState.toggleEditorReadOnly(true));
  yield put(actions.post.getOnePost(postId));
  yield put(actions.router.push(`/postDetail/${postId}`));
}

export function* getOnePostEdit(action) {
  const { postId } = action;
  yield put(actions.editorState.setEditorType("edit"));
  yield put(actions.editorState.toggleEditorReadOnly(false));
  yield put(actions.post.getOnePost(postId));
}

export function* getPosts(action) {
  try {
    const { userId } = action;
    yield put(actions.post.getPostsLoading());
    let posts;
    if (userId) {
      posts = yield api.postApi.getPostsOfUser(userId);
    } else {
      posts = yield api.postApi.getAllPosts();
    }
    yield put(actions.post.getPostsSuccess(posts));
  } catch (error) {
    yield put(actions.post.getPostsFailure(error));
  }
}

export function* updatePost() {
  const editorState = yield select(selectors.editorState.getEditorState);
  const titlePhotoUrl = getTitlePhotoFrom(editorState);
  console.log("titlePhotoUrl", titlePhotoUrl);
  yield put(actions.editorState.setTitlePhoto(titlePhotoUrl));

  const UserId = yield select(selectors.user.getUserId);
  const title = yield select(selectors.editorState.getTitle);
  const subTitle = yield select(selectors.editorState.getSubTitle);
  const titlePhoto = yield select(selectors.editorState.getTitlePhoto);
  const postId = yield select(selectors.post.getCurrentPostId);

  const newPost = {
    editorState,
    UserId,
    title,
    subTitle,
    titlePhoto
  };
  yield api.postApi.updatePost({ postId, newPost });
  yield put(actions.post.getOnePost(postId));
  yield put(actions.modal.modalUpAndGo("edited"));
  yield put(actions.router.push(`/postDetail/${postId}`));
}

export function* deletePost(action) {
  const { postId } = action;
  yield api.postApi.deletePost(postId);
  yield put(actions.router.push("/"));
}
