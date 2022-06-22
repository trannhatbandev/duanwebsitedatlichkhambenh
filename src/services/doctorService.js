import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
const { Op } = require('sequelize');
import emailServices from '../services/emailServices';
const MAX_NUMBER = process.env.MAX_NUMBER;
let getDoctorService = async (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        limit: limit,
        where: { roleId: 'R2' },
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: db.Allcode,
            as: 'positionData',
            attributes: ['valueVi'],
          },
          {
            model: db.Allcode,
            as: 'genderData',
            attributes: ['valueVi'],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: user,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllDoctorServices = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctor = await db.User.findAll({
        where: { roleId: 'R2' },
        attributes: {
          exclude: ['password', 'image'],
        },
      });
      resolve({
        errCode: 0,
        data: doctor,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let checkInputField = (inputData) => {
  let arr = [
    'doctorId',
    'selectPrice',
    'selectPayment',
    'selectProvince',
    'addressClinic',
    'nameClinic',
    'note',
    'action',
    'specialtyId',
    'clinicId',
    'contentMarkdown',
  ];
  let isValid = true;
  let element = '';
  for (let i = 0; i < arr.length; i++) {
    if (!inputData[arr[i]]) {
      isValid = false;
      element = arr[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element,
  };
};
let saveDoctorServices = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkInputData = checkInputField(data);
      if (checkInputData.isValid === false) {
        resolve({
          errCode: 1,
          errMesage: `Thiếu dữ liệu đầu vào: ${checkInputData.element}`,
        });
      } else {
        if (data.action === 'CREATE') {
          await db.Blog.create({
            contentMarkdown: data.contentMarkdown,
            description: data.description,
            doctorId: data.doctorId,
          });
        } else if (data.action === 'EDIT') {
          let doctor = await db.Blog.findOne({
            where: { doctorId: data.doctorId },
            raw: false,
          });
          if (doctor) {
            doctor.contentMarkdown = data.contentMarkdown;
            doctor.description = data.description;
            await doctor.save();
          }
        }
        let doctorInfo = await db.Doctor_Infor.findOne({
          where: {
            doctorId: data.doctorId,
          },
          raw: false,
        });
        if (doctorInfo) {
          doctorInfo.doctorId = data.doctorId;
          doctorInfo.priceId = data.selectPrice;
          doctorInfo.provinceId = data.selectProvince;
          doctorInfo.paymentId = data.selectPayment;
          doctorInfo.nameClinic = data.nameClinic;
          doctorInfo.addressClinic = data.addressClinic;
          doctorInfo.note = data.note;
          doctorInfo.specialtyId = data.specialtyId;
          doctorInfo.clinicId = data.clinicId;

          await doctorInfo.save();
        } else {
          await db.Doctor_Infor.create({
            doctorId: data.doctorId,
            priceId: data.selectPrice,
            provinceId: data.selectProvince,
            paymentId: data.selectPayment,
            addressClinic: data.addressClinic,
            nameClinic: data.nameClinic,
            note: data.note,
            specialtyId: data.specialtyId,
            clinicId: data.clinicId,
          });
        }
        resolve({
          errCode: 0,
          errMesage: 'Thêm bác sĩ thành công',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailDoctorServices = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let data = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: db.Blog,
              attributes: ['description', 'contentMarkdown'],
            },
            { model: db.Allcode, as: 'positionData', attributes: ['valueVi'] },
            {
              model: db.Doctor_Infor,
              attributes: {
                exclude: ['id', 'doctorId'],
              },
              include: [
                {
                  model: db.Allcode,
                  as: 'priceData',
                  attributes: ['valueVi'],
                },
                {
                  model: db.Allcode,
                  as: 'paymentData',
                  attributes: ['valueVi'],
                },
                {
                  model: db.Allcode,
                  as: 'provinceData',
                  attributes: ['valueVi'],
                },
              ],
            },
          ],
          nest: true,
          raw: false,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, 'base64').toString('binary');
        }

        resolve({
          errCode: 0,
          errMesage: 'Ok',
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let bulkCreateScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.fomatDate) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu data',
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER;
            return item;
          });
        }
        let exist = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.fomatDate },
          attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
          raw: true,
        });

        let toCreate = _.differenceWith(schedule, exist, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMesage: 'OK',
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
let getScheduleByDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu các trường',
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: 'timeTypeData',
              attributes: ['valueVi'],
            },
            {
              model: db.User,
              as: 'doctorData',
              attributes: ['firstName', 'lastName'],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let countScheduleDoctorByIdService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu các trường',
        });
      } else {
        let dataCount = await db.Schedule.findAll({
          where: { doctorId: doctorId },
        });

        if (!dataCount) dataCount = [];
        resolve({
          errCode: 0,
          data: dataCount,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getDoctorInfoService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let data = await db.Doctor_Infor.findOne({
          where: { doctorId: doctorId },
          attributes: {
            exclude: ['id', 'doctorId'],
          },
          include: [
            {
              model: db.Allcode,
              as: 'priceData',
              attributes: ['valueVi'],
            },
            {
              model: db.Allcode,
              as: 'paymentData',
              attributes: ['valueVi'],
            },
            {
              model: db.Allcode,
              as: 'provinceData',
              attributes: ['valueVi'],
            },
          ],

          nest: true,
          raw: false,
        });
        if (!data) data = {};
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
let getDoctorInfoBookingService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let data = await db.User.findOne({
          where: { id: doctorId },
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: db.Blog,
              attributes: ['description', 'contentMarkdown'],
            },
            {
              model: db.Allcode,
              as: 'positionData',
              attributes: ['valueVi'],
            },
            {
              model: db.Doctor_Infor,
              attributes: {
                exclude: ['id', 'doctorId'],
              },
              include: [
                {
                  model: db.Allcode,
                  as: 'priceData',
                  attributes: ['valueVi'],
                },
                {
                  model: db.Allcode,
                  as: 'paymentData',
                  attributes: ['valueVi'],
                },
                {
                  model: db.Allcode,
                  as: 'provinceData',
                  attributes: ['valueVi'],
                },
              ],
            },
          ],

          nest: true,
          raw: false,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, 'base64').toString('binary');
        }
        if (!data) data = {};
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
let getBookingPatientServices = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let data = await db.Booking.findAll({
          where: { doctorId: doctorId, statusId: 'S2', date: date },

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
              include: [
                {
                  model: db.Allcode,
                  as: 'genderData',
                  attributes: ['valueVi'],
                },
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
let confirmbookingPatientSuccessServices = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.patientId || !data.timeType) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let res = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            patientId: data.patientId,
            timeType: data.timeType,
            statusId: 'S2',
          },
          raw: false,
        });
        if (res) {
          res.statusId = 'S3';
          await res.save();
        }

        await db.History.create({
          doctorId: data.doctorId,
          patientId: data.patientId,
        });

        await emailServices.sendBookingPatientSuccess(data);
        resolve({
          errCode: 0,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getHistoryBookingServices = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            doctorId: doctorId,
            [Op.or]: [
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
        let dataDoctor = await db.Doctor_Infor.findAll({
          where: { doctorId: doctorId },
          include: [
            {
              model: db.Allcode,
              as: 'priceData',
              attributes: ['valueVi'],
            },
            {
              model: db.Allcode,
              as: 'paymentData',
              attributes: ['valueVi'],
            },
          ],
          nest: true,
          raw: false,
        });
        resolve({
          errCode: 0,
          data: data,
          dataDoctor: dataDoctor,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getHistoryBookingAdminServices = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            doctorId: doctorId,
            [Op.or]: [
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
            date: date,
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
        let dataDoctor = await db.Doctor_Infor.findAll({
          where: { doctorId: doctorId },
          include: [
            {
              model: db.Allcode,
              as: 'priceData',
              attributes: ['valueVi'],
            },
            {
              model: db.Allcode,
              as: 'paymentData',
              attributes: ['valueVi'],
            },
          ],
          nest: true,
          raw: false,
        });
        resolve({
          errCode: 0,
          data: data,
          dataDoctor: dataDoctor,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getScheduleServices = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        let data = await db.Schedule.findAll({
          where: { doctorId: doctorId },
          include: [
            {
              model: db.Allcode,
              as: 'timeTypeData',
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

let deleteScheduleService = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedule = await db.Schedule.findOne({
        where: { id: dataInput.id },
      });
      if (!schedule) {
        resolve({
          errCode: 2,
          errMessage: 'Kế hoạch không tồn tại',
        });
      }
      await db.Schedule.destroy({
        where: { id: dataInput.id },
      });
      resolve({
        errCode: 0,
        errMessage: 'Xóa kế hoạch thành công',
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getDoctorService: getDoctorService,
  getAllDoctorServices: getAllDoctorServices,
  saveDoctorServices: saveDoctorServices,
  getDetailDoctorServices: getDetailDoctorServices,
  bulkCreateScheduleService: bulkCreateScheduleService,
  getScheduleByDateService: getScheduleByDateService,
  countScheduleDoctorByIdService: countScheduleDoctorByIdService,
  getDoctorInfoService: getDoctorInfoService,
  getDoctorInfoBookingService: getDoctorInfoBookingService,
  getBookingPatientServices: getBookingPatientServices,
  confirmbookingPatientSuccessServices: confirmbookingPatientSuccessServices,
  getHistoryBookingServices: getHistoryBookingServices,
  getScheduleServices: getScheduleServices,
  deleteScheduleService: deleteScheduleService,
  getHistoryBookingAdminServices: getHistoryBookingAdminServices,
};
