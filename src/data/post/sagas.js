import { put, select } from "redux-saga/effects";

import { actions, selectors } from "data";
import api from "api";
import { getTitlePhotoFrom, getPostInfoFrom, uploadTagsToDB } from "./helper";

export function* createPost() {
  try {
    const editorState = yield select(selectors.editorState.getEditorState);
    const UserId = yield select(selectors.user.getUserId);
    const titlePhotoUrl = getTitlePhotoFrom(editorState);
    const { title: titleInfo, subTitle: subTitleInfo } = getPostInfoFrom(
      editorState
    );

    yield put(actions.editorState.setTitlePhoto(titlePhotoUrl));
    yield put(actions.editorState.setTitle(titleInfo));
    yield put(actions.editorState.setSubTitle(subTitleInfo));

    const title = yield select(selectors.editorState.getTitle);
    const subTitle = yield select(selectors.editorState.getSubTitle);
    const titlePhoto = yield select(selectors.editorState.getTitlePhoto);

    const postStates = {
      editorState,
      UserId,
      title,
      subTitle,
      titlePhoto
    };
    const res = yield api.postApi.createPost(postStates);
    const { createdPostId } = res.data;

    yield uploadTagsToDB({ editorState, postId: createdPostId });

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
    yield put(
      actions.editorState.updateEditorState({
        newEditorState: post.editorState
      })
    );
  } catch (error) {
    console.log("error", error);
    yield put(actions.post.getOnePostFailure(error));
  }
}

//TODO: not appropriate name, need to change
export function* getOnePostDetail(action) {
  const { postId } = action;
  yield put(actions.editorState.setEditorType("detail"));

  yield put(actions.post.getOnePost(postId));
  yield put(actions.editorState.toggleEditorReadOnly(true));
}

//TODO: not appropriate name, need to change
export function* getOnePostEdit(action) {
  const { postId } = action;
  yield put(actions.editorState.setEditorType("edit"));
  yield put(actions.editorState.toggleEditorReadOnly(false));
  yield put(actions.post.getOnePost(postId));
}

export function* getPosts(action) {
  try {
    const { tagId } = action.payload ? action.payload : {};
    const userId = yield select(selectors.user.getUserId);
    let posts;

    // const { action: routerAction } = yield select(selectors.router.getRouter);

    yield put(actions.post.getPostsLoading());
    // not specific tag || on mypage (TODO: refactoring needed)
    if (tagId === 0 || !tagId) {
      if (userId) {
        posts = yield api.postApi.getPostsOfUser(userId);
      } else {
        //only shows Admin users post
        posts = yield api.postApi.getPostsOfUser(1);
      }
    } else {
      posts = yield api.postApi.getPostsByTagId(tagId);
    }

    yield put(actions.post.getPostsSuccess(posts));
  } catch (error) {
    console.log("error.message", error.message);
    yield put(actions.post.getPostsFailure(error));
  }
}

export function* updatePost() {
  const editorState = yield select(selectors.editorState.getEditorState);
  const titlePhotoUrl = getTitlePhotoFrom(editorState);
  const { title: titleInfo, subTitle: subTitleInfo } = getPostInfoFrom(
    editorState
  );
  yield put(actions.editorState.setTitlePhoto(titlePhotoUrl));
  yield put(actions.editorState.setTitle(titleInfo));
  yield put(actions.editorState.setSubTitle(subTitleInfo));

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
  yield uploadTagsToDB({ editorState, postId });
  yield put(actions.post.getOnePost(postId));
  yield put(actions.modal.modalUpAndGo("edited"));
  yield put(actions.router.push(`/postDetail/${postId}`));
}

export function* deletePost(action) {
  const { postId } = action;
  yield api.postApi.deletePost(postId);
  yield put(actions.router.push("/"));
}

export function* getAllTags(action) {
  const res = yield api.tagApi.getAllTags();
  const { tags } = res.data;
  yield put(actions.post.updateTags({ tags }));
}

export function* getTagsByUserId(action) {
  const userId = action.payload;
  const res = yield api.tagApi.getTagsByUserId(userId);
  const { tags } = res.data;
  yield put(actions.post.updateTags({ tags }));
}

export function* deleteTag(action) {
  const { tagId } = action.payload;
  yield api.tagApi.deleteTag({ tagId });

  yield getAllTags();
  yield getPosts();
  yield put(actions.post.updateCurrentTag({ tagName: "ALL", id: 0 }));
}
