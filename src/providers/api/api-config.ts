export const API_ENDPOINTS = {
  login: {
    login: `/auth/login`,
    logout: `/auth/logout`
  },
  orders: {
    getVehicles: `/order/get/vehicles`,
    getDriver: `/order/get/drivers`,
    getLaburers: `/order/get/labourers`,
    getItems: `/order/get/items`,
    getSupplier : '/order/get/supplier',
    getSupplierAddess : '/order/get/supplier/address',
    getSupplierItemPrice : '/order/get/supplier/item/price',
    getSupplierPayment : '/order/get/supplier/payment',
    getCustomers: `/order/get/customers`,
    getCustomerAddess : '/order/get/customers/address',
    getCustomerItemPrice : '/order/get/customers/item/price',
    getCustomerPayment : '/order/get/customers/payment',
    getPartners: `/order/get/partners`,
    createorder: `/order/create`,
    getOrderList: `/order/get/list`,
    getOrderDetails:`/order/get/order/details`,
    updateDetails: `/order/update/details`,
    getDiesel: `/order/get/diesel/details`,
    updateDiesel: `/order/add/diesel/details`
  },
  adminAction :{
    getUserList : '/user/manage/get/user/list',
    addUser : '/user/manage/get/user/creat',
    UpdateUser : '/user/manage/get/user/update',
    DeleteUser : '/user/manage/get/user/delete',
    getVehicleList : '/user/manage/get/vehicles/list',
    addVehicle : '/user/manage/get/vehicles/creat',
    UpdateVehicle : '/user/manage/get/vehicles/update',
    DeleteVehicle : '/user/manage/get/vehicles/delete',
    getSuplierList : '/user/manage/get/suplier/list',
    addSuplier : '/user/manage/get/suplier/creat',
    UpdateSuplier : '/user/manage/get/suplier/update',
    DeleteSuplier : '/user/manage/get/suplier/delete',
    getCustomerList : '/user/manage/get/customer/list',
    addSCustomer: '/user/manage/get/customer/creat',
    UpdateCustomer : '/user/manage/get/customer/update',
    DeleteCustomer : '/user/manage/get/customer/delete',
    getDriverList : "/user/manage/get/driver/list"
  }
 
};

