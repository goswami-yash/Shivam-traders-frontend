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

    getVehicleList : '/admin/vehicle/list',
    AddVehicle : '/admin/vehicle/create',
    UpdateVehicle : '/admin/get/vehicle/update',
    DeleteVehicle : '/admin/vehicle/delete',
    getVehicleById : "/admin/vehicle/details/by_id",

    getSupplierList : '/admin/supplier/list',
    addSupplier : '/admin/supplier/create',
    UpdateSupplier : '/admin/supplier/update',
    DeleteSupplier : '/admin/supplier/delete',
    getSupplierById : "/admin/supplier/details/by_id",

    getCustomerList : '/admin/customer/list',
    AddCustomer: '/admin/customer/create',
    UpdateCustomer : '/admin/customer/update',
    DeleteCustomer : '/admin/customer/delete',
    getCustomerById : "/admin/customer/details/by_id",

    getDriverList : "/admin/driver/list",
    AddDriver : "/admin/driver/create",
    UpdateDriver : "/admin/driver/update",
    DeleteDriver : "/admin/driver/delete",
    getDriverById : "/admin/driver/details/by_id",

    getItemList : "/admin/item/list",
    AddItem : "/admin/item/create",
    UpdateItem : "/admin/item/update",
    DeleteItem : "/admin/item/delete",
    getItemById : "/admin/item/details/by_id",
  }
 
};

