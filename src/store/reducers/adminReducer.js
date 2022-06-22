import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoadingGender: false,
  gender: [],
  role: [],
  position: [],
  users: [],
  doctor: [],
  alldoctor: [],
  time: [],
  countSchedule: [],

  schedules: [],

  allInfoDataDoctor: [],

  specialtys: [],

  clinics: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.gender = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.gender = [];
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.role = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.role = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.position = [];
      return {
        ...state,
      };
    case actionTypes.READ_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.READ_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.UPDATE_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.READ_LIMIT_DOCTOR_SUCCESS:
      state.doctor = action.data;
      return {
        ...state,
      };
    case actionTypes.READ_LIMIT_DOCTOR_FAILED:
      state.doctor = [];
      return {
        ...state,
      };
    case actionTypes.GET_DOCTOR_SUCCESS:
      state.alldoctor = action.datadoctor;
      return {
        ...state,
      };
    case actionTypes.GET_DOCTOR_FAILED:
      state.alldoctor = [];
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_SCHEDULE_SUCCESS:
      state.time = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.GET_ALLCODE_SCHEDULE_FAILED:
      state.time = [];
      return {
        ...state,
      };
    case actionTypes.COUNT_SCHEDULE_SUCCESS:
      state.countSchedule = action.count;
      return {
        ...state,
      };
    case actionTypes.COUNT_SCHEDULE_FAILED:
      state.countSchedule = [];
      return {
        ...state,
      };
    case actionTypes.GET_DATA_INFO_DOCTOR_SUCCESS:
      state.allInfoDataDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_DATA_INFO_DOCTOR_FAILED:
      state.allInfoDataDoctor = [];
      return {
        ...state,
      };
    case actionTypes.GET_SCHEDULE_SUCCESS:
      state.schedules = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_SCHEDULE_FAILED:
      state.schedules = [];
      return {
        ...state,
      };
    case actionTypes.DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.DELETE_SCHEDULE_FAILED:
      return {
        ...state,
      };
    case actionTypes.READ_SPECIALTY_SUCCESS:
      state.specialtys = action.data;
      return {
        ...state,
      };
    case actionTypes.READ_SPECIALTY_FAILED:
      state.specialtys = [];
      return {
        ...state,
      };
    case actionTypes.READ_CLINIC_SUCCESS:
      state.clinics = action.data;
      return {
        ...state,
      };
    case actionTypes.READ_CLINIC_FAILED:
      state.clinics = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
