require('dotenv').config();
import nodemailer from 'nodemailer';

let sendEmail = async (dataSendEmail) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Admin 👻" <dangt4665@gmail.com>',
    to: dataSendEmail.reciverEmail,
    subject: 'Thông tin đặt lịch khám bệnh',
    text: 'Hello world?',
    html: getBodyHtml(dataSendEmail),
  });
};

let getBodyHtml = (dataSendEmail) => {
  let result = '';
  result = `
    <h3>Xin chào!${dataSendEmail.patientName}</h3>
    <p>Bạn nhận được thông tin đặt lịch trên trang web của chúng tôi</p>
    <p>Bạn đã đến khám tại phòng khám của chúng tôi vào lúc:${dataSendEmail.time}</p>
    <p>Với bác sĩ: ${dataSendEmail.doctorName} 
    <h1>Bạn hãy vui lòng đọc kỹ lại các thông tin trên</h1>
    <p>Vui lòng click vào đường link này để xác nhận và hoàn tất thủ tục đăng ký lịch khám bệnh: <a href="${dataSendEmail.redirectLink}" target="_blank">link</a> </p>
    <div>Xin chân thành cảm ơn bạn đã sử dụng website của chúng tôi!</div>
    `;
  return result;
};

let sendBookingPatientSuccess = async (dataSendEmail) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let admin = 'dangt4665@gmail.com';
  let info = await transporter.sendMail({
    from: '"Admin 👻" <dangt4665@gmail.com>',
    to: `${dataSendEmail.email}, ${admin}`,
    subject: 'Thông tin đặt lịch khám bệnh',
    text: 'Cảm ơn bạn đã',
    html: getBodyHtmlBookingSuccess(dataSendEmail),
  });
};

let getBodyHtmlBookingSuccess = (dataSendEmail) => {
  let result = '';
  result = `
    <h3>Xin chào ${dataSendEmail.patientName}!</h3>
    <p>Bạn nhận được thông tin đặt lịch trên trang web của chúng tôi</p>
    <p>Bạn đã đến khám tại phòng khám của chúng tôi vào lúc: ${dataSendEmail.time}</p>
    <h1>Bạn đã khám xong!</h1>
    <div>Xin chân thành cảm ơn bạn đã sử dụng website của chúng tôi!</div>
    `;
  return result;
};

let sendEmailCancelBooking = async (dataSendEmail) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let admin = 'dangt4665@gmail.com';
  let info = await transporter.sendMail({
    from: '"Admin 👻" <dangt4665@gmail.com>',
    to: `${dataSendEmail.email}, ${admin}`,
    subject: 'Hủy lịch khám bệnh thành công',
    text: 'Hello world?',
    html: getBodyHtmlCancelBooking(dataSendEmail),
  });
};
let getBodyHtmlCancelBooking = (dataSendEmail) => {
  let result = '';
  result = `
    <h3>Xin chào!${dataSendEmail.patientName}</h3>
    <p>Bạn nhận được thông tin đặt lịch trên trang web của chúng tôi</p>
    <p>Bạn đã hủy thành công lịch khám trên trang web của chúng tôi vào lúc:${dataSendEmail.time}</p>
    <h1>Bạn hãy vui lòng đọc kỹ lại các thông tin trên</h1>
    <div>Xin chân thành cảm ơn bạn đã sử dụng website của chúng tôi!</div>
    `;
  return result;
};

module.exports = {
  sendEmail: sendEmail,
  sendBookingPatientSuccess: sendBookingPatientSuccess,
  sendEmailCancelBooking: sendEmailCancelBooking,
};
