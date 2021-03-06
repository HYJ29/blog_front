import * as AT from "data/rootActionTypes";

export const setUserSession = payload => ({
  type: AT.SET_USER_SESSION,
  payload
});

export const resetAuth = () => ({
  type: AT.RESET_AUTH
});

export const loginTraditional = payload => ({
  type: AT.LOG_IN_TRADITIONAL,
  payload
});

export const loginSocial = payload => ({
  type: AT.LOG_IN_SOCIAL,
  payload
});

export const loginLoading = () => ({
  type: AT.LOG_IN_LOADING
});

export const loginFailure = error => ({
  type: AT.LOG_IN_FAILURE,
  error
});

export const loginSuccess = data => ({
  type: AT.LOG_IN_SUCCESS,
  data
});

export const logout = () => ({
  type: AT.LOG_OUT
});

export const registerTraditional = payload => ({
  type: AT.REGISTER_TRADITIONAL,
  payload
});

export const registerSocial = payload => ({
  type: AT.REGISTER_SOCIAL,
  payload
});

export const registerLoading = () => ({
  type: AT.REGISTER_LOADING
});

export const registerFailure = error => ({
  type: AT.REGISTER_FAILURE,
  error
});

export const registerSuccess = data => ({
  type: AT.REGISTER_SUCCESS,
  data
});

export const whoAmI = () => ({
  type: AT.WHO_AM_I
});

export const whoAmILoading = () => ({
  type: AT.WHO_AM_I_LOADING
});

export const whoAmIFailure = error => ({
  type: AT.WHO_AM_I_FAILURE,
  error
});

export const whoAmISuccess = data => ({
  type: AT.WHO_AM_I_SUCCESS,
  data
});
