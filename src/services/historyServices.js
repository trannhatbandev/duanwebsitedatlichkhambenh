import db from '../models/index';

let getDetailSpecialtyByIdService = () => {
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
module.exports = {};
