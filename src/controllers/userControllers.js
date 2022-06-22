import userServices from '../services/userServices';

let userLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Bạn phải nhập email và password!',
    });
  }
  let userData = await userServices.userServiceLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let getAllUser = async (req, res) => {
  let id = req.query.id; //all, id
  let user = await userServices.getAllUserService(id);
  console.log(user);
  return res.status(200).json({
    errCode: 0,
    errMessage: 'OK',
    user,
  });
};
let createUser = async (req, res) => {
  let message = await userServices.createUserService(req.body);
  return res.status(200).json(message);
};
let updateUser = async (req, res) => {
  let data = req.body;
  let message = await userServices.updateUserService(data);
  return res.status(200).json(message);
};
let deleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Thiếu trường id',
    });
  }
  let message = await userServices.deleteUserService(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  userLogin: userLogin,
  getAllUser: getAllUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
