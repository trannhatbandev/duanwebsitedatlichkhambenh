import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let userServiceLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExistEmail = await checkEmail(email);
      if (isExistEmail) {
        let user = await db.User.findOne({
          attributes: [
            'id',
            'email',
            'roleId',
            'password',
            'firstName',
            'lastName',
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let checkPassword = await bcrypt.compareSync(password, user.password);
          if (checkPassword) {
            userData.errCode = 0;
            userData.errMessage = `Đăng nhập thành công!`;
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Mật khẩu của bạn sai!`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Người dùng không tồn tại! Vui lòng kiểm tra lại`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Email của bạn không tồn tại! Vui lòng kiểm tra lại`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = '';
      if (id === 'ALL') {
        user = await db.User.findAll({
          attributes: {
            exclude: ['password'],
          },
        });
      }
      if (id && id !== 'ALL') {
        user = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ['password'],
          },
          raw: true,
        });
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashUserPassword = await bcrypt.hashSync(password, salt);
      resolve(hashUserPassword);
    } catch (error) {
      reject(error);
    }
  });
};
let createUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: 'Email đã có xin nhập email khác',
        });
      } else {
        let hashPasswordFromBcryptjs = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcryptjs,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.image,
        });
      }

      resolve({
        errCode: 0,
        errMessage: 'OK',
      });
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: 'Thiếu các trường',
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.gender = data.gender;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        if (data.image) {
          user.image = data.image;
        }

        await user.save();
        resolve({
          errCode: 0,
          errMessage: 'Cập nhật user thành công!',
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: 'Không có người dùng',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUserService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: 'Người dùng không tồn tại',
        });
      }
      await db.User.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        errMessage: 'Xóa người dùng thành công',
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  userServiceLogin: userServiceLogin,
  getAllUserService: getAllUserService,
  createUserService: createUserService,
  deleteUserService: deleteUserService,
  updateUserService: updateUserService,
};
