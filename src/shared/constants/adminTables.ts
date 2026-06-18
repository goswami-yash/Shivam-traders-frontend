import { title } from "process";
import { text } from "stream/consumers";

//-------------------------------------------
      //-------- ADMIN SERVICE LIST------- //
//------------------------------------------

export const DriverList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title : "DRIVER LIST",
  Button_Title : "DRIVER ADD",
  header: [
    { title: "DRIVER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "LICENSE NO" },
    { title: "AADHAR NO" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "email" ,type : "text" },
    { key: "license_no" ,type : "text" },
    { key: "aadhar_no" ,type : "text" },
    { key: "address" ,type : "text" },
    { key: "is_active" ,type : "Boolean"},
  ],
};

export const VehicleList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title : "VEHICLE LIST",
  Button_Title : "VEHICLE ADD",
  header: [
    { title: "VEHICLE NO" },
    { title: "OWNER NAME" },
    { title: "VEHICLE CATEGORIES" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "vehicle_number", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "owner_name", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "is_private" ,type : "Boolean"},
    { key: "is_active" ,type : "Boolean" },
  ]
};

export const CustomerList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title : "CUSTOMER LIST",
  Button_Title : "CUSTOMER ADD",
  header: [
    { title: "CUSTOMER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "CUSTOMER TYPE"},
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "email", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "company_name",type : "text"},
    { key: "customer_type" ,type : "text"},
    { key: "is_active" ,type : "Boolean" },
  ],
}

export const SupplierList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title : "SUPPLER LIST",
  Button_Title : "SUPPLIER ADD",
  header: [
    { title: "SUPPLIER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "email", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "company_name",type : "text"},
    { key: "is_active" ,type : "Boolean" },
  ],
}

export const ItemList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title : "ITEM LIST",
  Button_Title : "ITEM ADD",
  header: [
    { title: "ITEM NAME" },
    { title: "UNIT" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "unit", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "is_active" ,type : "Boolean" },
  ],
}

export const TableContent = {
  DriverList,
  VehicleList,
  CustomerList,
  SupplierList,
  ItemList
};

//-------------------------------------------
  //-------- ADMIN SERVICE UPDATE ------- //
//------------------------------------------

 export const UpdateDriver = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  header: [
    { title: "DRIVER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "LICENSE NO" },
    { title: "AADHAR NO" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", type: "text" },
    { key: "mobile_no", type: "text" },
    { key: "email", type: "text" },
    { key: "license_no", type: "text" },
    { key: "aadhar_no", type: "text" },
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdateVehicle = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  header: [
    { title: "VEHICLE NO" },
    { title: "VEHICLE CATEGORIES" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "vehicle_number", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "is_private" ,type : "Boolean"},
    { key: "is_active" ,type : "Boolean" },
  ],
}

export const UpdateCustomer = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title : "CUSTOMER LIST",
  Button_Title : "CUSTOMER ADD",
  header: [
    { title: "CUSTOMER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "email", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "company_name",type : "text"},
    { key: "is_active" ,type : "Boolean" },
  ],
}

export const UpdateSupplier = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title : "SUPPLIER LIST",
  Button_Title : "SUPPLIER ADD",
  header: [
    { title: "SUPPLIER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "email", isSearchable: true, filterKey: "search" ,type : "text"},
    { key: "company_name",type : "text"},
    { key: "is_active" ,type : "Boolean" },
  ],
}

export const UpdateItem = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title : "ITEM LIST",
  Button_Title : "ITEM ADD",
  header: [
    { title: "ITEM NAME" },
    { title: "UNIT" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search" ,type : "text" },
    { key: "unit", type : "text"},
    { key: "is_active" ,type : "Boolean" },
  ],
}
export const EditConfig = {
  Driver: {
    header : UpdateDriver.header,
    fields: UpdateDriver.body,
    detailApi: "DriverDetails",
    updateApi: "UpdateDriver",
    backUrl: "/admin-action/drivers",
  },

  Vehicle: {
    header : UpdateVehicle.header,
    fields: UpdateVehicle.body,
    detailApi: "VehicleDetails",
    updateApi: "UpdateVehicle",
    backUrl: "/admin-action/vehicles",
  },

  Customer: {
    header : UpdateCustomer.header,
    fields: UpdateCustomer.body,
    detailApi: "CustomerDetails",
    updateApi: "UpdateCustomer",
    backUrl: "/admin-action/Customer",
  },

  Supplier: {
    header : UpdateSupplier.header,
    fields: UpdateSupplier.body,
    detailApi: "SupplierDetails",
    updateApi: "UpdateSupplier",
    backUrl: "/admin-action/Supplier",
  },

  Item: {
    header : UpdateItem.header,
    fields: UpdateItem.body,
    detailApi: "ItemDetails",
    updateApi: "UpdateItem",
    backUrl: "/admin-action/Item",
  },
};

//-------------------------------------------
  //-------- ADMIN SERVICE DELETE ------- //
//------------------------------------------

export const DeleteConfig = {
  Driver: {
    api: "DeleteDriver",
    idField: "driver_id",
  },

  Vehicle: {
    api: "DeleteVehicle",
    idField: "vehicle_id",
  },

  Customer: {
    api: "DeleteCustomer",
    idField: "customer_id",
  },

  Supplier: {
    api: "DeleteSupplier",
    idField: "supplier_id",
  },

  Item: {
    api: "DeleteItem",
    idField: "item_id",
  },
};

//-------------------------------------------
  //-------- ADMIN SERVICE ADD ------- //
//------------------------------------------
export const DriverADD = {
  Header_Title: "DRIVER ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "DRIVER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "LICENSE NO" },
    { title: "AADHAR NO" },
    {title : "PASSWORD"},
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", type: "text" },
    { key: "mobile_no", type: "text" },
    { key: "email", type: "text" },
    { key: "license_no", type: "text" },
    { key: "aadhar_no", type: "text" },
    { key : "password" , type : "text"},
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ]
};

export const VehicleADD ={
  Header_Title: "VEHICLE ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "VEHICLE NO" },
    { title: "VEHICLE CATEGORIES" },
    { title: "IS ACTIVE" }
  ],
  body: [
    { key: "vehicle_number", type: "text" },
    { key: "is_private", type: "Boolean" },
    { key: "is_active", type: "Boolean" }
  ]
}

export const CustomerADD = {
  Header_Title: "CUSTOMER ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "CUSTOMER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "CUSTOMER TYPE"},
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", type : "text" },
    { key: "mobile_no" ,type : "text"},
    { key: "email",type : "text"},
    { key: "company_name",type : "text"},
    { key: "customer_type" ,type : "text"},
    { key: "is_active" ,type : "Boolean" },
  ],
}

export const SupplierADD = {
  Header_Title: "SUPLIER ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "SUPLIER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", type : "text" },
    { key: "mobile_no" ,type : "text"},
    { key: "email",type : "text"},
    { key: "company_name",type : "text"},
    { key: "is_active" ,type : "Boolean" },
  ],
}

export const ItemADD = {
  Header_Title: "ITEM ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "ITEM NAME" },
    { title: "UNIT" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", type : "text" },
    { key: "unit" ,type : "text"},
    { key: "is_active" ,type : "Boolean" },
  ],
}

export const ADDConfig = {
  Driver: {
    header: DriverADD.header,
    fields: DriverADD.body,
    Header_Title: DriverADD.Header_Title,
    Submit_Button: DriverADD.Submit_Button,

    AddApi: "AddDriver",

    backUrl: "/admin-action/drivers",
  },

  Vehicle:{
    header: VehicleADD.header,
    fields: VehicleADD.body,
    Header_Title: VehicleADD.Header_Title,
    Submit_Button: VehicleADD.Submit_Button,

    AddApi:"AddVehicle",

    backUrl: "/admin-action/vehicles",
  },

  Customer :{
    header: CustomerADD.header,
    fields: CustomerADD.body,
    Header_Title: CustomerADD.Header_Title,
    Submit_Button: CustomerADD.Submit_Button,

    AddApi:"AddCustomer",

    backUrl: "/admin-action/customer"
  },

  Supplier :{
    header: SupplierADD.header,
    fields: SupplierADD.body,
    Header_Title: SupplierADD.Header_Title,
    Submit_Button: SupplierADD.Submit_Button,

    AddApi:"AddSupplier",

    backUrl: "/admin-action/supplier"
  },

  Item :{
    header: ItemADD.header,
    fields: ItemADD.body,
    Header_Title: ItemADD.Header_Title,
    Submit_Button: ItemADD.Submit_Button,

    AddApi:"AddItem",

    backUrl: "/admin-action/item"
  }

};
export const PAGE_SIZES = [3, 15, 20, 50, 100];


/*export const EditConfig = {
  driver: {
    title: "Update Driver",

    api:
      API_ENDPOINTS.adminAction.UpdateDriver,

    fields: [
      {
        key: "name",
        label: "Driver Name",
        type: "text",
      },
      {
        key: "mobile_no",
        label: "Mobile",
        type: "text",
      },
      {
        key: "email",
        label: "Email",
        type: "email",
      },
      {
        key: "license_no",
        label: "License",
        type: "text",
      },
      {
        key: "aadhar_no",
        label: "Aadhar",
        type: "text",
      },
      {
        key: "address",
        label: "Address",
        type: "textarea",
      },
    ],
  },

  vehicle: {
    title: "Update Vehicle",

    api:
      API_ENDPOINTS.adminAction.UpdateVehicle,

    fields: [
      {
        key: "vehicle_number",
        label: "Vehicle Number",
        type: "text",
      },
      {
        key: "owner_name",
        label: "Owner Name",
        type: "text",
      },
      {
        key: "is_private",
        label: "Private",
        type: "checkbox",
      },
    ],
  },
}; */