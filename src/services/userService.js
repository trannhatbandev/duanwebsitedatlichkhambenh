import axios from '../axios';

const handleLogin = (email, password) => {
  return axios.post('/api/login', { email, password });
};

const handleGEtAllUSer = (id) => {
  return axios.get(`/api/get-all-user?id=${id}`);
};
const createNewUserService = (data) => {
  return axios.post(`/api/create-user`, data);
};
const deleteUserService = (id) => {
  return axios.delete(`/api/delete-user`, { data: { id: id } });
};
const updateUserService = (data) => {
  return axios.put(`/api/update-user`, data);
};
const registerPatientServices = (data) => {
  return axios.post(`/api/register-patient-info-booking`, data);
};
const verifyBookingEmailServices = (data) => {
  return axios.post(`/api/verify-booking-email`, data);
};
const getHistoryBooking = (patientId) => {
  return axios.get(`/api/get-history-booking-patient?patientId=${patientId}`);
};

const updateHistoryBooking = (data) => {
  return axios.post(`/api/update-status-history-booking`, data);
};
export {
  handleLogin,
  handleGEtAllUSer,
  createNewUserService,
  deleteUserService,
  updateUserService,
  registerPatientServices,
  verifyBookingEmailServices,
  getHistoryBooking,
  updateHistoryBooking,
};
