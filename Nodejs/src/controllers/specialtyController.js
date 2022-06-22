import specialtyServices from '../services/specialtyServices';

let createNewSpecialtyController = async (req, res) => {
  try {
    let response = await specialtyServices.createNewSpecialtyService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let getSpecialtyController = async (req, res) => {
  try {
    let response = await specialtyServices.getSpecialtyService();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let getDetailSpecialtyByIdController = async (req, res) => {
  try {
    let response = await specialtyServices.getDetailSpecialtyByIdService(
      req.query.id,
      req.query.location
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
let deleteSpecialtyController = async (req, res) => {
  try {
    let response = await specialtyServices.deleteSpecialtyService(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
let updateSpecialtyController = async (req, res) => {
  let data = req.body;
  let message = await specialtyServices.updateSpecialtyService(data);
  return res.status(200).json(message);
};
module.exports = {
  createNewSpecialtyController: createNewSpecialtyController,
  getSpecialtyController: getSpecialtyController,
  getDetailSpecialtyByIdController: getDetailSpecialtyByIdController,
  deleteSpecialtyController: deleteSpecialtyController,
  updateSpecialtyController: updateSpecialtyController,
};
