import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  isLoggedInHome: false,
  userInfo: null,
  userInfoHome: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.USER_LOGIN_HOME_SUCCESS:
      return {
        ...state,
        isLoggedInHome: true,
        userInfoHome: action.userInfoHome,
      };
    case actionTypes.USER_LOGIN_HOME_FAIL:
      return {
        ...state,
        isLoggedInHome: false,
        userInfoHome: null,
      };
    case actionTypes.PROCESS_HOME_LOGOUT:
      return {
        ...state,
        isLoggedInHome: false,
        userInfoHome: null,
      };
    default:
      return state;
  }
};

export default appReducer;
