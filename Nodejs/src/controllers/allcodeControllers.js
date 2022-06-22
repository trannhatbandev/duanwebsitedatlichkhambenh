import allcodeService from '../services/allcodeService';

let allcode = async (req, res) => {
  try {
    let data = await allcodeService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Lỗi server',
    });
  }
};
module.exports = {
  allcode: allcode,
};
