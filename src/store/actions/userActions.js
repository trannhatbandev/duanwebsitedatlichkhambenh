import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});
export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
export const userLoginHomeSuccess = (userInfoHome) => ({
  type: actionTypes.USER_LOGIN_HOME_SUCCESS,
  userInfoHome: userInfoHome,
});

export const userLoginHomeFail = () => ({
  type: actionTypes.USER_LOGIN_HOME_FAIL,
});

export const processLogoutHome = () => ({
  type: actionTypes.PROCESS_HOME_LOGOUT,
});
