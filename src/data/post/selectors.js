import * as AT from "data/rootActionTypes";

const defaultCover = process.env.PUBLIC_URL + "/images/default_cover_image.svg";

export const getCurrentPost = state => state.post.currentPost;

export const getPosts = state => state.post.posts;
export const getPostsStatusRemote = state => state.post[AT.GET_POSTS];
export const getOnePostStatusRemote = state => state.post[AT.GET_ONE_POST];

export const getCurrentPostUserId = state => state.post.currentPost?.UserId;

export const getCurrentPostId = state => state.post.currentPost?.id;

export const getTitle = state => state.post.currentPost?.title;
export const getSubTitle = state => state.post.currentPost?.subTitle;
export const getTitlePhoto = state =>
  state.post.currentPost?.titlePhoto ?? defaultCover;

export const getTags = state => state.post.tags;
export const getCurrentTag = state => state.post.currentTag;
export const getCurrentTagName = state => state.post.currentTag?.tagName;
