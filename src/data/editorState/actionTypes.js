import { loading, failure, success } from "data/utils";

export const ADD_IMAGE = "ADD_IMAGE";
export const ADD_IMAGE_SUCCESS = success(ADD_IMAGE);
export const ADD_IMAGE_FAILURE = failure(ADD_IMAGE);
export const ADD_IMAGE_LOADING = loading(ADD_IMAGE);

export const UPDATE_EDITOR_STATE = "UPDATE_EDITOR_STATE";

export const UPDATE_SIDE_BAR_ISOPEN = "UPDATE_SIDE_BAR_ISOPEN";
export const UPDATE_SIDE_BAR_POSITION = "UPDATE_SIDE_BAR_POSITION";

export const UPDATE_UPPPER_BAR_POSITION = "UPDATE_UPPPER_BAR_POSITION";

export const DELETE_IMAGE = "DELETE_IMAGE";

export const TOGGLE_BLOCK = "TOGGLE_BLOCK";

export const ADD_ATOMIC_BLOCK = "ADD_ATOMIC_BLOCK";

export const TOGGLE_EDITOR_READ_ONLY = "TOGGLE_EDITOR_READ_ONLY";

export const TOGGLE_IS_LINK_INPUT = "TOGGLE_IS_LINK_INPUT";

export const TOGGLE_INLINE = "TOGGLE_INLINE";

export const TOGGLE_LINK = "TOGGLE_LINK";

export const REPLACE_ENTIY_DATA = "REPLACE_ENTIY_DATA";

export const SET_TITLE = "SET_TITLE";

export const SET_TITLE_PHOTO = "SET_TITLE_PHOTO";

export const SET_SUB_TITLE = "SET_SUB_TITLE";

export const SET_EDITOR_TYPE = "SET_EDITOR_TYPE";

export const POPULATE_EDITOR_STATE = "POPULATE_EDITOR_STATE";
export const LOAD_SAVED_EDITOR_STATE = "LOAD_SAVED_EDITOR_STATE";

export const RESET_EDITOR_STATE = "RESET_EDITOR_STATE";

export const SUBMIT_LINK_INPUT = "SUBMIT_LINK_INPUT";
export const SUBMIT_YOUTUBE_INPUT = "SUBMIT_YOUTUBE_INPUT";
export const SUBMIT_SPLASH_INPUT = "SUBMIT_SPLASH_INPUT";

export const SELECT_SPLASH_IMAGE = "SELECT_SPLASH_IMAGE";

export const UPDATE_SUBJECT_INDEXES = "UPDATE_SUBJECT_INDEXES";
export const SET_SUBJECT_INDEXES = "SET_SUBJECT_INDEXES";
