export const adminMenu = [
  {
    //quản lý người dùng
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.crud-user',
        link: '/system/crud-user',
      },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/manage-doctor',
      },
    ],
  },
  {
    //quản lý phòng khám
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/manage-clinic',
      },
    ],
  },
  {
    //quản lý chuyên khoa
    name: 'menu.admin.specialty',
    menus: [
      {
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty',
      },
    ],
  },
  {
    //quản lý lịch sử khám bệnh
    name: 'menu.admin.history-booking',
    menus: [
      {
        name: 'menu.admin.manage-history-booking',
        link: '/system/manage-history-booking',
      },
    ],
  },
];
export const doctorMenu = [
  {
    name: 'menu.doctor.manage-schedule',
    menus: [
      {
        name: 'menu.doctor.schedule',
        link: '/doctor/manage-schedule',
      },
      {
        name: 'menu.doctor.manage-booking',
        link: '/doctor/manage-booking',
      },
      {
        name: 'menu.doctor.history-booking',
        link: '/doctor/history-booking',
      },
    ],
  },
];
