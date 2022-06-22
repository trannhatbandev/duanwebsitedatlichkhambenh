import express from 'express';
import homController from '../controllers/homeControllers';
import userController from '../controllers/userControllers';
import allcodeController from '../controllers/allcodeControllers';
import doctorController from '../controllers/doctorControllers';
import patientController from '../controllers/patientController';
import specialtyController from '../controllers/specialtyController';
import clicnicController from '../controllers/clinicController';

let router = express.Router();

//arrow function
let initWebRotes = (app) => {
  router.get('/', homController.getHomePage);

  router.get('/about', homController.getAboutPage);

  router.get('/crud', homController.getCrud);
  router.get('/users', homController.getUsers);
  router.get('/edit-user', homController.editUser);

  router.post('/insert-user', homController.insertUser);
  router.post('/update-user', homController.updateUser);

  router.post('/api/login', userController.userLogin);
  router.get('/api/get-all-user', userController.getAllUser);
  router.post('/api/create-user', userController.createUser);
  router.put('/api/update-user', userController.updateUser);
  router.delete('/api/delete-user', userController.deleteUser);

  router.get('/api/get-allcode', allcodeController.allcode);

  router.get('/api/get-doctor', doctorController.getDoctor);
  router.get('/api/get-all-doctor', doctorController.getAllDoctor);
  router.post('/api/save-doctor', doctorController.saveDoctor);
  router.get('/api/get-detail-doctor', doctorController.getDetailDoctor);
  router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
  router.get(
    '/api/get-schedule-doctor-by-date',
    doctorController.getScheduleDoctorByDate
  );
  router.get(
    '/api/count-schedule-doctor-by-id',
    doctorController.countScheduleDoctorById
  );
  router.get('/api/get-schedule', doctorController.getScheduleController);
  router.get('/api/get-doctor-info', doctorController.getDoctorInfo);
  router.get(
    '/api/get-doctor-info-booking',
    doctorController.getDoctorInfoBooking
  );
  router.post(
    '/api/cofirm-booking-patient-success',
    doctorController.confirmbookingPatientSuccess
  );
  router.delete('/api/delete-schedule', doctorController.deleteSchedule);

  router.get('/api/get-history-booking', doctorController.getHistoryBooking);
  router.get(
    '/api/get-history-booking-admin',
    doctorController.getHistoryBookingAdmin
  );

  router.get('/api/get-booking-patient', doctorController.getBookingPatient);
  router.post(
    '/api/register-patient-info-booking',
    patientController.registerPatientInfoController
  );
  router.get(
    '/api/get-history-booking-patient',
    patientController.getHistoryBookingController
  );

  router.post(
    '/api/update-status-history-booking',
    patientController.updateStatusHistoryBookingController
  );

  router.post(
    '/api/verify-booking-email',
    patientController.verifyBookingEmail
  );

  router.post(
    '/api/create-new-specialty',
    specialtyController.createNewSpecialtyController
  );
  router.get('/api/get-specialty', specialtyController.getSpecialtyController);
  router.get(
    '/api/get-detail-specialty-by-id',
    specialtyController.getDetailSpecialtyByIdController
  );
  router.put(
    '/api/update-specialty',
    specialtyController.updateSpecialtyController
  );
  router.delete(
    '/api/delete-specialty',
    specialtyController.deleteSpecialtyController
  );

  router.post(
    '/api/create-new-clinic',
    clicnicController.createNewClinicController
  );
  router.get('/api/get-clinic', clicnicController.getClinicController);
  router.get(
    '/api/get-detail-clinic-by-id',
    clicnicController.getDetailClinicByIdController
  );
  router.delete('/api/delete-clinic', clicnicController.deleteClinicController);
  router.put('/api/update-clinic', clicnicController.updateClinicController);
  //rest api
  return app.use('/', router);
};

module.exports = initWebRotes;
