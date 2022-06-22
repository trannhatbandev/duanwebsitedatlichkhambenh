import axios from '../axios';

const createNewSpecialtyServices = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getSpecialtyServices = () => {
  return axios.get(`/api/get-specialty`);
};
const getDetailSpecialtyByIdServices = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const deleteSpecialtyServices = (id) => {
  return axios.delete(`/api/delete-specialty`, { data: { id: id } });
};

const updateSpecialtyServices = (data) => {
  return axios.put(`/api/update-specialty`, data);
};

export {
  createNewSpecialtyServices,
  getSpecialtyServices,
  getDetailSpecialtyByIdServices,
  deleteSpecialtyServices,
  updateSpecialtyServices,
};
