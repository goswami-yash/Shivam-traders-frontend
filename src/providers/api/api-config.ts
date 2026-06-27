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
    getSupplier: '/order/get/supplier',
    getSupplierAddess: '/order/get/supplier/address',
    getSupplierItemPrice: '/order/get/supplier/item/price',
    getSupplierPayment: '/order/get/supplier/payment',
    getCustomers: `/order/get/customers`,
    getCustomerAddess: '/order/get/customers/address',
    getCustomerItemPrice: '/order/get/customers/item/price',
    getCustomerPayment: '/order/get/customers/payment',
    getPartners: `/order/get/partners`,
    createorder: `/order/create`,
    getOrderList: `/order/get/list`,
    getOrderDetails: `/order/get/order/details`,
    updateDetails: `/order/update/details`,
    getDiesel: `/order/get/diesel/details`,
    updateDiesel: `/order/add/diesel/details`
  },
  adminAction: {
    getUserList: '/user/manage/get/user/list',
    addUser: '/user/manage/get/user/creat',
    UpdateUser: '/user/manage/get/user/update',
    DeleteUser: '/user/manage/get/user/delete',

    getVehicleList: '/admin/vehicle/list',
    AddVehicle: '/admin/vehicle/create',
    UpdateVehicle: '/admin/vehicle/update',
    DeleteVehicle: '/admin/vehicle/delete',
    getVehicleById: "/admin/vehicle/details/by_id",

    getSupplierList: '/admin/supplier/list',
    addSupplier: '/admin/supplier/create',
    UpdateSupplier: '/admin/supplier/update',
    DeleteSupplier: '/admin/supplier/delete',
    getSupplierById: "/admin/supplier/details/by_id",

    getCustomerList: '/admin/customer/list',
    AddCustomer: '/admin/customer/create',
    UpdateCustomer: '/admin/customer/update',
    DeleteCustomer: '/admin/customer/delete',
    getCustomerById: "/admin/customer/details/by_id",

    getDriverList: "/admin/driver/list",
    AddDriver: "/admin/driver/create",
    UpdateDriver: "/admin/driver/update",
    DeleteDriver: "/admin/driver/delete",
    getDriverById: "/admin/driver/details/by_id",

    getItemList: "/admin/item/list",
    AddItem: "/admin/item/create",
    UpdateItem: "/admin/item/update",
    DeleteItem: "/admin/item/delete",
    getItemById: "/admin/item/details/by_id",

    getPlotList: "/admin/plot/list",
    AddPlot: "/admin/plot/create",
    UpdatePlot: "/admin/plot/update",
    DeletePlot: "/admin/plot/delete",
    getPlotById: "/admin/plot/details/by_id",

    getPartnerList: "/admin/partner/list",
    AddPartner: "/admin/partner/create",
    UpdatePartner: "/admin/partner/update",
    DeletePartner: "/admin/partner/delete",
    getPartnerById: "/admin/partner/details/by_id",

    getTransporterList: "/admin/transporter/list",
    AddTransporter: "/admin/transporter/create",
    UpdateTransporter: "/admin/transporter/update",
    DeleteTransporter: "/admin/transporter/delete",
    getTransporterById: "/admin/transporter/details/by_id",
    getTransporterNameList: "/admin/transporter/name/list",

    getLabourerList: "/admin/labourer/list",
    AddLabourer: "/admin/labourer/create",
    UpdateLabourer: "/admin/labourer/update",
    DeleteLabourer: "/admin/labourer/delete",
    getLabourerById: "/admin/labourer/details/by_id",

    getVehicleAssignmentList: "/admin/labourer/list",
    vehicleAssignmentCreate: "/admin/labourer/list",
    vehicleAssignmentUpdate: "/admin/labourer/list",
    vehicleAssignmentDelete: "/admin/labourer/list",
    getvehicleAssignmentById: "/admin/labourer/details/by_id",

    labourPlotAssignmentList: "/admin/labour-plot-assignment/list",
    labourPlotAssignmentCreate: "/admin/labour-plot-assignment/create",
    labourPlotAssignmentUpdate: "/admin/labour-plot-assignment/update",
    labourPlotAssignmentDelete: "/admin/labour-plot-assignment/delete",
    labourPlotAssignmentById: "/admin/labour-plot-assignment/details",

    getCustomerAddressList: '/admin/customer/address/list',
    AddCustomerAddress: '/admin/customer/address/create',
    UpdateCustomerAddress: '/admin/customer/address/update',
    DeleteCustomerAddress: '/admin/customer/address/delete',
    getCustomerAddressById: "/admin/customer/address/details/by_id",

    getCustomerPaymentList: '/admin/customer/payment/list',
    AddCustomerPayment: '/admin/customer/payment/create',
    UpdateCustomerPayment: '/admin/customer/payment/update',
    DeleteCustomerPayment: '/admin/customer/payment/delete',
    getCustomerPaymentById: "/admin/customer/payment/details/by_id",

    getCustomerItemPriceList: '/admin/customer/item/price/list',
    AddCustomerItemPrice: '/admin/customer/item/price/create',
    UpdateCustomerItemPrice: '/admin/customer/item/price/update',
    DeleteCustomerItemPrice: '/admin/customer/item/price/delete',
    getCustomerItemPriceById: "/admin/customer/item/price/details/by_id",

    getLabourerAssignPlotList: '/admin/labourer/assign/plot/list',
    AddLabourerAssignPlot: '/admin/labourer/assign/plot/create',
    UpdateLabourerAssignPlot: '/admin/labourer/assign/plot/update',
    DeleteLabourerAssignPlot: '/admin/labourer/assign/plot/delete',
    getLabourerAssignPlotById: "/admin/labourer/assign/plot/details/by_id",

    getSupplierAddressList: '/admin/supplier/address/list',
    AddSupplierAddress: '/admin/supplier/address/create',
    UpdateSupplierAddress: '/admin/supplier/address/update',
    DeleteSupplierAddress: '/admin/supplier/address/delete',
    getSupplierAddressById: '/admin/supplier/address/details/by_id',

    getSupplierPaymentList: '/admin/supplier/payment/list',
    AddSupplierPayment: '/admin/supplier/payment/create',
    UpdateSupplierPayment: '/admin/supplier/payment/update',
    DeleteSupplierPayment: '/admin/supplier/payment/delete',
    getSupplierPaymentById: '/admin/supplier/payment/details/by_id',

    getSupplierItemPriceList: '/admin/supplier/item/price/list',
    AddSupplierItemPrice: '/admin/supplier/item/price/create',
    UpdateSupplierItemPrice: '/admin/supplier/item/price/update',
    DeleteSupplierItemPrice: '/admin/supplier/item/price/delete',
    getSupplierItemPriceById: '/admin/supplier/item/price/details/by_id',

  }

};

