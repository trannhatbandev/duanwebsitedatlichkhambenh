import historyServices from '../services/historyServices';

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

module.exports = {};
