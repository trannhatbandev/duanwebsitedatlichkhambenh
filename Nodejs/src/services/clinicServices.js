import db from '../models/index';

let createNewClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          description: data.descriptionMarkdown,
          image: data.imageBase64,
        });

        resolve({
          errCode: 0,
          errMesage: 'Ok',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getClinicService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, 'base64').toString('binary');
        });
      }
      resolve({
        errCode: 0,
        errMesage: 'Ok',
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailClinicByIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu trường',
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: id,
          },
          attributes: ['name', 'description', 'address'],
        });
        if (data) {
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: id },
            attributes: ['doctorId', 'provinceId'],
          });
          data.doctorClinic = doctorClinic;
        } else data = {};
        resolve({ errMesage: 'OK', errCode: 0, data });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteClinicService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu trường',
        });
      } else {
        let clinic = await db.Clinic.findOne({
          where: { id: id },
        });
        if (!clinic) {
          resolve({
            errCode: 2,
            errMessage: 'Phòng khám không tồn tại',
          });
        }
        await db.Clinic.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          errMessage: 'Xóa Phòng khám thành công',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.name ||
        !data.descriptionMarkdown ||
        !data.imageBase64 ||
        !data.address
      ) {
        resolve({
          errCode: 2,
          errMessage: 'Thiếu các trường',
        });
      }
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (clinic) {
        clinic.name = data.name;
        clinic.address = data.address;
        clinic.description = data.descriptionMarkdown;
        if (data.imageBase64) {
          clinic.image = data.imageBase64;
        }

        await clinic.save();
        resolve({
          errCode: 0,
          errMessage: 'Cập nhật phòng khám thành công!',
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: 'Không có phòng khám',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewClinicService: createNewClinicService,
  getClinicService: getClinicService,
  getDetailClinicByIdService: getDetailClinicByIdService,
  deleteClinicService: deleteClinicService,
  updateClinicService: updateClinicService,
};
