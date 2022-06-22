'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tbl_users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'John',
      lastName: 'Doe',
      address: 'TPHCM',
      phoneNumber: '0978119953',
      gender: 1,
      image: 'npg.jpg',
      roleId: 'R1',
      positionId: 'P1',
      createdAt: new Date(),
      updatedAt: new Date()

    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tbl_users', null, {});
  }
};
