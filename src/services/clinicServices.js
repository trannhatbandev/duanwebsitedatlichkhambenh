import axios from '../axios';

const createNewClinicServices = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};

const getClinicServices = () => {
  return axios.get(`/api/get-clinic`);
};
const getDetailClinicByIdServices = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
const deleteClinicServices = (id) => {
  return axios.delete(`/api/delete-clinic`, { data: { id: id } });
};

const updateClinicServices = (data) => {
  return axios.put(`/api/update-clinic`, data);
};

export {
  createNewClinicServices,
  getClinicServices,
  getDetailClinicByIdServices,
  deleteClinicServices,
  updateClinicServices,
};
