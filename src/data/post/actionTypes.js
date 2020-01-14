import { loading, failure, success } from "data/utils";

export const CURRENT_POST_CHANGE = "CURRENT_POST_CHANGE";

export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = success(GET_POSTS);
export const GET_POSTS_FAILURE = failure(GET_POSTS);
export const GET_POSTS_LOADING = loading(GET_POSTS);

export const GET_ONE_POST = "GET_ONE_POST";
export const GET_ONE_POST_SUCCESS = success(GET_ONE_POST);
export const GET_ONE_POST_FAILURE = failure(GET_ONE_POST);
export const GET_ONE_POST_LOADING = loading(GET_ONE_POST);

export const CREATE_POST = "CREATE_POST";

export const DELETE_POST = "DELETE_POST";

export const UPDATE_POST = "UPDATE_POST";
