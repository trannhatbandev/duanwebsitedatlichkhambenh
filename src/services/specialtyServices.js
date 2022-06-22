import db from '../models/index';
let createNewSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.imageBase64 || !data.descriptionMarkdown) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu dữ liệu đầu vào',
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          description: data.descriptionMarkdown,
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
let getSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});
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
let getDetailSpecialtyByIdService = (id, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !location) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu trường',
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: id,
          },
          attributes: ['description'],
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === 'ALL') {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: id },
              attributes: ['doctorId', 'provinceId'],
            });
          } else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: id,
                provinceId: location,
              },
              attributes: ['doctorId', 'provinceId'],
            });
          }
          data.doctorSpecialty = doctorSpecialty;
        } else data = {};
        resolve({ errMesage: 'OK', errCode: 0, data });
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
let deleteSpecialtyService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMesage: 'Thiếu trường',
        });
      } else {
        let specialty = await db.Specialty.findOne({
          where: { id: id },
        });
        if (!specialty) {
          resolve({
            errCode: 2,
            errMessage: 'Chuyên khoa không tồn tại',
          });
        }
        await db.Specialty.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          errMessage: 'Xóa Chuyên khoa thành công',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.name ||
        !data.descriptionMarkdown ||
        !data.imageBase64
      ) {
        resolve({
          errCode: 2,
          errMessage: 'Thiếu các trường',
        });
      }
      let specialty = await db.Specialty.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (specialty) {
        specialty.name = data.name;
        specialty.description = data.descriptionMarkdown;
        if (data.imageBase64) {
          specialty.image = data.imageBase64;
        }

        await specialty.save();
        resolve({
          errCode: 0,
          errMessage: 'Cập nhật chuyên khoa thành công!',
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: 'Không có chuyên khoa',
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewSpecialtyService: createNewSpecialtyService,
  getSpecialtyService: getSpecialtyService,
  getDetailSpecialtyByIdService: getDetailSpecialtyByIdService,
  deleteSpecialtyService: deleteSpecialtyService,
  updateSpecialtyService: updateSpecialtyService,
};
