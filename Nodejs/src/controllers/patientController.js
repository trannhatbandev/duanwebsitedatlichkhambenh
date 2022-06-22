import patientServices from '../services/patientServices';

let registerPatientInfoController = async (req, res) => {
  try {
    let response = await patientServices.registerPatientInfoService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let verifyBookingEmail = async (req, res) => {
  try {
    let response = await patientServices.verifyBookingEmailService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let getHistoryBookingController = async (req, res) => {
  try {
    let response = await patientServices.getHistoryBookingService(
      req.query.patientId
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
let updateStatusHistoryBookingController = async (req, res) => {
  try {
    let response = await patientServices.updateStatusHistoryBookingService(
      req.body
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

module.exports = {
  registerPatientInfoController: registerPatientInfoController,
  verifyBookingEmail: verifyBookingEmail,
  getHistoryBookingController: getHistoryBookingController,
  updateStatusHistoryBookingController: updateStatusHistoryBookingController,
};
