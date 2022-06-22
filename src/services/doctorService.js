import axios from '../axios';
const getDoctorService = (limit) => {
  return axios.get(`/api/get-doctor?limit=${limit}`);
};

const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctor`);
};

const saveInfoDoctor = (data) => {
  return axios.post(`/api/save-doctor`, data);
};

const getDetailDoctorService = (id) => {
  return axios.get(`/api/get-detail-doctor?id=${id}`);
};

const bulkCreateSchedule = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const countScheduleDoctorByIdService = (doctorId) => {
  return axios.get(`/api/count-schedule-doctor-by-id?doctorId=${doctorId}`);
};

const getDoctorInfoService = (doctorId) => {
  return axios.get(`/api/get-doctor-info?doctorId=${doctorId}`);
};

const getDoctorInfoBooking = (doctorId) => {
  return axios.get(`/api/get-doctor-info-booking?doctorId=${doctorId}`);
};

const getBookingPatient = (data) => {
  return axios.get(
    `/api/get-booking-patient?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const bookingPatientSuccess = (data) => {
  return axios.post(`/api/cofirm-booking-patient-success`, data);
};
const getDataSchedule = (doctorId) => {
  return axios.get(`/api/get-schedule?doctorId=${doctorId}`);
};

const deleteScheduleService = (dataInput) => {
  return axios.delete(`/api/delete-schedule`, { data: { id: dataInput.id } });
};
const getHistoryBooking = (doctorId) => {
  return axios.get(`/api/get-history-booking?doctorId=${doctorId}`);
};

const getHistoryBookingAdmin = (doctorId, date) => {
  return axios.get(
    `/api/get-history-booking-admin?doctorId=${doctorId}&date=${date}`
  );
};

export {
  getDoctorService,
  getAllDoctorService,
  saveInfoDoctor,
  getDetailDoctorService,
  bulkCreateSchedule,
  getScheduleDoctorByDate,
  countScheduleDoctorByIdService,
  getDoctorInfoService,
  getDoctorInfoBooking,
  getBookingPatient,
  bookingPatientSuccess,
  getDataSchedule,
  deleteScheduleService,
  getHistoryBooking,
  getHistoryBookingAdmin,
};
