import clinicServices from '../services/clinicServices';

let createNewClinicController = async (req, res) => {
  try {
    let response = await clinicServices.createNewClinicService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let getClinicController = async (req, res) => {
  try {
    let response = await clinicServices.getClinicService();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let getDetailClinicByIdController = async (req, res) => {
  try {
    let response = await clinicServices.getDetailClinicByIdService(
      req.query.id
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
let deleteClinicController = async (req, res) => {
  try {
    let response = await clinicServices.deleteClinicService(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let updateClinicController = async (req, res) => {
  let data = req.body;
  let message = await clinicServices.updateClinicService(data);
  return res.status(200).json(message);
};
module.exports = {
  createNewClinicController: createNewClinicController,
  getClinicController: getClinicController,
  getDetailClinicByIdController: getDetailClinicByIdController,
  deleteClinicController: deleteClinicController,
  updateClinicController: updateClinicController,
};
