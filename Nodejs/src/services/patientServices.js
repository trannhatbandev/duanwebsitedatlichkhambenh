import db from '../models/index';
require('dotenv').config();
import bcrypt from 'bcryptjs';
import sendEmail from './emailServices';
const { Op } = require('sequelize');
import { v4 as uuidv4 } from 'uuid';
const salt = bcrypt.genSaltSync(10);
let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-email-booking?token=${token}&doctorId=${doctorId}`;
  return result;
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

let registerPatientInfoService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.timeType ||
        !data.date ||
        !data.doctorId ||
        !data.firstName ||
        !data.lastName ||
        !data.address ||
        !data.password
      ) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let token = uuidv4();

        let hashPasswordFromBcryptjs = await hashUserPassword(data.password);
        await sendEmail.sendEmail({
          reciverEmail: data.email,
          patientName: `${data.lastName} ${data.firstName}`,
          time: data.time,
          doctorName: data.doctorName,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            firstName: data.firstName,
            password: hashPasswordFromBcryptjs,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.selectGender,
            roleId: 'R3',
          },
        });

        if (user[0]) {
          await db.Booking.findOrCreate({
            where: {
              timeType: data.timeType,
              date: data.date,
              statusId: 'S2',
              statusId: 'S3',
            },
            defaults: {
              statusId: 'S1',
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          errMesage: 'Thêm thành công',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let verifyBookingEmailService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let verifyEmail = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: 'S1',
          },
          raw: false,
        });
        if (verifyEmail) {
          verifyEmail.statusId = 'S2';
          await verifyEmail.save();
          resolve({
            errCode: 0,
            errMesage: 'Cập nhật trạng thái booking thành công!',
          });
        } else {
          resolve({
            errCode: 2,
            errMesage: 'Không tồn tại lịch hẹn',
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getHistoryBookingService = (patientId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      if (!patientId) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        data = await db.Booking.findAll({
          where: {
            patientId: patientId,
            [Op.or]: [
              {
                statusId: {
                  [Op.eq]: 'S2',
                },
              },
              {
                statusId: {
                  [Op.eq]: 'S3',
                },
              },
              {
                statusId: {
                  [Op.eq]: 'S4',
                },
              },
            ],
          },
          include: [
            {
              model: db.User,
              as: 'patientData',
              attributes: [
                'email',
                'firstName',
                'address',
                'gender',
                'phoneNumber',
                'lastName',
              ],
            },
            {
              model: db.Allcode,
              as: 'timeTypeDataPatient',
              attributes: ['valueVi'],
            },
          ],

          nest: true,
          raw: false,
        });

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateStatusHistoryBookingService = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !dataInput.patientId ||
        !dataInput.date ||
        !dataInput.timeType ||
        !dataInput.email ||
        !dataInput.firstName ||
        !dataInput.lastName
      ) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        await sendEmail.sendEmailCancelBooking({
          email: dataInput.email,
          patientName: `${dataInput.lastName} ${dataInput.firstName}`,
          time: `${dataInput.dateformat} , ${dataInput.time}`,
        });
        let data1 = await db.Booking.findOne({
          where: {
            patientId: dataInput.patientId,
            statusId: 'S2',
            date: dataInput.date,
            timeType: dataInput.timeType,
          },
          raw: false,
        });

        if (data1) {
          data1.statusId = 'S4';
          await data1.save();
        }
        resolve({
          errCode: 0,
          data: data1,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  registerPatientInfoService: registerPatientInfoService,
  verifyBookingEmailService: verifyBookingEmailService,
  getHistoryBookingService: getHistoryBookingService,
  updateStatusHistoryBookingService: updateStatusHistoryBookingService,
};
