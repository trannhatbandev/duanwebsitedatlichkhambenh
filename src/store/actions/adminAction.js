import actionTypes from './actionTypes';
import { getType } from '../../services/allcodeService';
import {
  createNewUserService,
  handleGEtAllUSer,
  deleteUserService,
  updateUserService,
} from '../../services/userService';

import {
  getDoctorService,
  getAllDoctorService,
  saveInfoDoctor,
  countScheduleDoctorByIdService,
  getDataSchedule,
  deleteScheduleService,
} from '../../services/doctorService';
import { getClinicServices } from '../../services/clinicServices';
import { getSpecialtyServices } from '../../services/specialtyService';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getType('gender');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log('Lỗi', error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getType('role');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      dispatch(fetchRoleFail());
      console.log('Lỗi', error);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPostionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getType('position');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      dispatch(fetchPositionFail());
      console.log('Lỗi', error);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const createUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Thêm người dùng thành công');
        dispatch(insertUserSuccess());
        dispatch(readUser());
      } else {
        dispatch(insertUserFail());
      }
    } catch (error) {
      dispatch(insertUserFail());
      console.log('Lỗi', error);
    }
  };
};

export const insertUserSuccess = () => ({
  type: actionTypes.INSERT_USER_SUCCESS,
});

export const insertUserFail = () => ({
  type: actionTypes.INSERT_USER_FAILED,
});

export const readUser = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGEtAllUSer('ALL');
      if (res && res.errCode === 0) {
        dispatch(readUserSuccess(res.user.reverse()));
      } else {
        dispatch(readUserFail());
      }
    } catch (error) {
      dispatch(readUserFail());
      console.log('Lỗi', error);
    }
  };
};

export const readUserSuccess = (data) => ({
  type: actionTypes.READ_ALL_USER_SUCCESS,
  users: data,
});

export const readUserFail = () => ({
  type: actionTypes.READ_ALL_USER_FAILED,
});

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(id);
      if (res && res.errCode === 0) {
        toast.success('Xóa người dùng thành công');
        dispatch(deleteUserSuccess());
        dispatch(readUser());
      } else {
        toast.error('Xóa người dùng không thành công');
        dispatch(deleteUserFail());
      }
    } catch (error) {
      toast.error('Xóa người dùng không thành công');
      dispatch(deleteUserFail());
      console.log('Lỗi', error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const updateUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await updateUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Cập nhật người dùng thành công');
        dispatch(updateUserSuccess());
        dispatch(readUser());
      } else {
        toast.error('Cập nhật người dùng không thành công');
        dispatch(updateUserFail());
      }
    } catch (error) {
      toast.error('Cập nhật người dùng không thành công');
      dispatch(updateUserFail());
      console.log('Lỗi', error);
    }
  };
};

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});

export const updateUserFail = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});

export const getDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDoctorService('');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.READ_LIMIT_DOCTOR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.READ_LIMIT_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.READ_LIMIT_DOCTOR_FAILED,
      });
      console.log('Lỗi', error);
    }
  };
};

export const getAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_DOCTOR_SUCCESS,
          datadoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_DOCTOR_FAILED,
      });
      console.log('Lỗi', error);
    }
  };
};

export const createInfoDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveInfoDoctor(data);
      if (res && res.errCode === 0) {
        toast.success('Lưu bác sĩ thành công');
        dispatch({
          type: actionTypes.SAVE_DOCTOR_SUCCESS,
        });
      } else {
        toast.error('Lưu bác sĩ không thành công');
        dispatch({
          type: actionTypes.SAVE_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Lưu bác sĩ không thành công');
      dispatch({
        type: actionTypes.SAVE_DOCTOR_FAILED,
      });
      console.log('Lỗi', error);
    }
  };
};

export const getAllCodeSchedule = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getType('TIME');
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_ALLCODE_SCHEDULE_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALLCODE_SCHEDULE_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALLCODE_SCHEDULE_FAILED,
      });
      console.log('Lỗi', error);
    }
  };
};

export const countScheduleAction = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let res = await countScheduleDoctorByIdService(doctorId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.COUNT_SCHEDULE_SUCCESS,
          count: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.COUNT_SCHEDULE_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.COUNT_SCHEDULE_FAILED,
      });
      console.log('Lỗi', error);
    }
  };
};

export const getInforDoctorAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.GET_DATA_INFO_DOCTOR_START });
      let price = await getType('PRICE');
      let payment = await getType('PAYMENT');
      let province = await getType('PROVINCE');
      let specialty = await getSpecialtyServices();
      let clinic = await getClinicServices();
      if (
        price &&
        price.errCode === 0 &&
        payment &&
        payment.errCode === 0 &&
        province &&
        province.errCode === 0 &&
        specialty &&
        specialty.errCode === 0 &&
        clinic &&
        clinic.errCode === 0
      ) {
        let data = {
          price: price.data,
          payment: payment.data,
          province: province.data,
          specialty: specialty.data,
          clinic: clinic.data,
        };
        dispatch(getInforDoctorActionSuccess(data));
      } else {
        dispatch(getInforDoctorActionFailed());
      }
    } catch (error) {
      dispatch(getInforDoctorActionFailed());
      console.log('Lỗi', error);
    }
  };
};

export const getInforDoctorActionSuccess = (data) => ({
  type: actionTypes.GET_DATA_INFO_DOCTOR_SUCCESS,
  data: data,
});

export const getInforDoctorActionFailed = () => ({
  type: actionTypes.GET_DATA_INFO_DOCTOR_FAILED,
});

export const readSchedule = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDataSchedule(doctorId);
      if (res && res.errCode === 0) {
        dispatch(readScheduleSuccess(res.data.reverse()));
      } else {
        dispatch(readScheduleFail());
      }
    } catch (error) {
      dispatch(readScheduleFail());
      console.log('Lỗi', error);
    }
  };
};

export const readScheduleSuccess = (data) => ({
  type: actionTypes.GET_SCHEDULE_SUCCESS,
  data: data,
});

export const readScheduleFail = () => ({
  type: actionTypes.GET_SCHEDULE_FAILED,
});

export const deleteSchedule = (dataInput) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteScheduleService(dataInput);
      if (res && res.errCode === 0) {
        toast.success('Xóa kế hoạch thành công');
        dispatch(deleteScheduleSuccess());
        dispatch(readSchedule(dataInput.doctorId));
      } else {
        toast.error('Xóa kế hoạch không thành công');
        dispatch(deleteScheduleFail());
      }
    } catch (error) {
      toast.error('Xóa kế hoạch không thành công');
      dispatch(deleteScheduleFail());
      console.log('Lỗi', error);
    }
  };
};

export const deleteScheduleSuccess = () => ({
  type: actionTypes.DELETE_SCHEDULE_SUCCESS,
});

export const deleteScheduleFail = () => ({
  type: actionTypes.DELETE_SCHEDULE_FAILED,
});

export const getSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getSpecialtyServices();
      if (res && res.errCode === 0) {
        dispatch(getSpecialtySuccess(res.data));
      } else {
        dispatch(getSpecialtyFail());
      }
    } catch (error) {
      dispatch(getSpecialtyFail());
      console.log('Lỗi', error);
    }
  };
};

export const getSpecialtySuccess = (data) => ({
  type: actionTypes.READ_SPECIALTY_SUCCESS,
  data: data,
});

export const getSpecialtyFail = () => ({
  type: actionTypes.READ_ALL_USER_FAILED,
});

export const getClinic = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getClinicServices();
      if (res && res.errCode === 0) {
        dispatch(getClinicSuccess(res.data));
      } else {
        dispatch(getClinicFail());
      }
    } catch (error) {
      dispatch(getClinicFail());
      console.log('Lỗi', error);
    }
  };
};

export const getClinicSuccess = (data) => ({
  type: actionTypes.READ_CLINIC_SUCCESS,
  data: data,
});

export const getClinicFail = () => ({
  type: actionTypes.READ_CLINIC_FAILED,
});
