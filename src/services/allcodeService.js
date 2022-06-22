import axios from '../axios';

const getType = (type) => {
  return axios.get(`/api/get-allcode?type=${type}`);
};
export { getType };
