import doctorSevice from '../services/doctorService';
let getDoctor = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorSevice.getDoctorService(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: 'Lỗi server',
    });
  }
};
let getAllDoctor = async (req, res) => {
  try {
    let doctors = await doctorSevice.getAllDoctorServices();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error server',
    });
  }
};
let saveDoctor = async (req, res) => {
  try {
    let response = await doctorSevice.saveDoctorServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error server',
    });
  }
};
let getDetailDoctor = async (req, res) => {
  try {
    let response = await doctorSevice.getDetailDoctorServices(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error server',
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let bulk = await doctorSevice.bulkCreateScheduleService(req.body);
    return res.status(200).json(bulk);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let getScheduleDoctorByDate = async (req, res) => {
  try {
    let schedule = await doctorSevice.getScheduleByDateService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let countScheduleDoctorById = async (req, res) => {
  try {
    let schedule = await doctorSevice.countScheduleDoctorByIdService(
      req.query.doctorId
    );
    return res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let getDoctorInfo = async (req, res) => {
  try {
    let response = await doctorSevice.getDoctorInfoService(req.query.doctorId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let getDoctorInfoBooking = async (req, res) => {
  try {
    let response = await doctorSevice.getDoctorInfoBookingService(
      req.query.doctorId
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let getBookingPatient = async (req, res) => {
  try {
    let response = await doctorSevice.getBookingPatientServices(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error server',
    });
  }
};
let confirmbookingPatientSuccess = async (req, res) => {
  try {
    let response = await doctorSevice.confirmbookingPatientSuccessServices(
      req.body
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error server',
    });
  }
};
let getHistoryBooking = async (req, res) => {
  try {
    let response = await doctorSevice.getHistoryBookingServices(
      req.query.doctorId
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error server',
    });
  }
};
let getScheduleController = async (req, res) => {
  try {
    let response = await doctorSevice.getScheduleServices(req.query.doctorId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error server',
    });
  }
};

let deleteSchedule = async (req, res) => {
  if (!req.body) {
    return res.status(200).json({
      errCode: 1,
      errMessage: 'Thiếu trường Id',
    });
  }
  let message = await doctorSevice.deleteScheduleService(req.body);
  return res.status(200).json(message);
};
let getHistoryBookingAdmin = async (req, res) => {
  try {
    let response = await doctorSevice.getHistoryBookingAdminServices(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error server',
    });
  }
};

module.exports = {
  getDoctor: getDoctor,
  getAllDoctor: getAllDoctor,
  saveDoctor: saveDoctor,
  getDetailDoctor: getDetailDoctor,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleDoctorByDate: getScheduleDoctorByDate,
  countScheduleDoctorById: countScheduleDoctorById,
  getDoctorInfo: getDoctorInfo,
  getDoctorInfoBooking: getDoctorInfoBooking,
  getBookingPatient: getBookingPatient,
  confirmbookingPatientSuccess: confirmbookingPatientSuccess,
  getHistoryBooking: getHistoryBooking,
  getScheduleController: getScheduleController,
  deleteSchedule: deleteSchedule,
  getHistoryBookingAdmin: getHistoryBookingAdmin,
};
