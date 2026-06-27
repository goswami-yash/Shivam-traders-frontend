import { title } from "process";
import { text } from "stream/consumers";

//-------------------------------------------
//-------- ADMIN SERVICE LIST------- //
//------------------------------------------

export const DriverList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "DRIVER LIST",
  Button_Title: "DRIVER ADD",
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
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "email", type: "text" },
    { key: "license_no", type: "text" },
    { key: "aadhar_no", type: "text" },
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
};

export const VehicleList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "VEHICLE LIST",
  Button_Title: "VEHICLE ADD",
  header: [
    { title: "VEHICLE NO" },
    { title: "OWNER NAME" },
    { title: "VEHICLE CATEGORIES" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "vehicle_number", isSearchable: true, filterKey: "search", type: "text" },
    { key: "owner_name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_private", type: "Boolean" },
    { key: "is_active", type: "Boolean" },
  ]
};

export const CustomerList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "CUSTOMER LIST",
  Button_Title: "CUSTOMER ADD",
  header: [
    { title: "CUSTOMER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "CUSTOMER TYPE" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "email", isSearchable: true, filterKey: "search", type: "text" },
    { key: "company_name", type: "text" },
    { key: "customer_type", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const SupplierList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "SUPPLER LIST",
  Button_Title: "SUPPLIER ADD",
  header: [
    { title: "SUPPLIER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "email", isSearchable: true, filterKey: "search", type: "text" },
    { key: "company_name", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const ItemList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "ITEM LIST",
  Button_Title: "ITEM ADD",
  header: [
    { title: "ITEM NAME" },
    { title: "UNIT" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "unit", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const PlotList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "PLOT LIST",
  Button_Title: "PLOT ADD",
  header: [
    { title: "PLOT NO" },
    { title: "PLOT NAME" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "plot_number", isSearchable: true, filterKey: "search", type: "text" },
    { key: "plot_name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "address", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const PartnerList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "PARTNER LIST",
  Button_Title: "PARTNER ADD",
  header: [
    { title: "PARTNER NAME" },
    { title: "MOBILE NO" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const TransporterList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "TRANSPORTER LIST",
  Button_Title: "TRANSPORTER ADD",
  header: [
    { title: "TRANSPORTER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "BANK NAME" },
    { title: "ACCOUNT NO" },
    { title: "IFSC CODE" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "email", type: "text" },
    { key: "company_name", type: "text" },
    { key: "bank_name", type: "text" },
    { key: "account_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "ifsc_code", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const LabourerList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "LABOURER LIST",
  Button_Title: "LABOURER ADD",
  header: [
    { title: "LABOURER NAME" },
    { title: "MOBILE NO" },
    { title: "AADHAR NO" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "aadhar_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const LabourPlotAssignmentList = {
  noDataText: "No Matching Data Found",
  withFilters: true,

  Header_Title: "LABOUR PLOT ASSIGNMENT LIST",

  Button_Title: "ADD ASSIGNMENT",

  header: [
    { title: "LABOUR NAME" },
    { title: "PLOT NAME" },
    { title: "START DATE" },
    { title: "END DATE" },
    { title: "STATUS" }
  ],

  body: [
    {
      key: "labour_name",
      isSearchable: true,
      filterKey: "search",
      type: "text"
    },

    {
      key: "plot_name",
      isSearchable: true,
      filterKey: "search",
      type: "text"
    },

    {
      key: "start_date",
      type: "text"
    },

    {
      key: "end_date",
      type: "text"
    },

    {
      key: "status",
      type: "text"
    }
  ]
};

export const CustomerAddressList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "CUSTOMER ADDRESS LIST",
  Button_Title: "CUSTOMER ADDRESS ADD",
  header: [
    { title: "CUSTOMER NAME" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "customer_name", type: "text" },
    { key: "address", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const CustomerPaymentList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "CUSTOMER PAYMENT LIST",
  Button_Title: "CUSTOMER PAYMENT ADD",

  header: [
    { title: "CUSTOMER NAME" },
    { title: "TYPE" },
    { title: "DIRECTION" },
    { title: "AMOUNT" },
    { title: "DATE" },
    { title: "REMARKS" },
  ],

  body: [{ key: "customer_name", isSearchable: true, filterKey: "customer_name", type: "text" },
  { key: "payment_type", isSearchable: true, filterKey: "payment_type", type: "text" },
  { key: "payment_direction", isSearchable: true, filterKey: "payment_direction", type: "text" },
  { key: "amount", isSearchable: true, filterKey: "amount", type: "text" }, // Number input 
  { key: "payment_date", isSearchable: true, filterKey: "payment_date", type: "date" }, // Calendar picker
  { key: "note", isSearchable: true, filterKey: "note", type: "text" },
  ],
};

export const CustomerItemPriceList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "ITEM PRICE LIST",
  Button_Title: "ITEM PRICE ADD",

  header: [
    { title: "CUSTOMER NAME" },
    { title: "ITEM NAME" },
    { title: "WEIGHT" },
    { title: "RATE" },
  ],

  body: [
    { key: "customer_name", isSearchable: true, filterKey: "customer_name", type: "text" },
    { key: "item_name", isSearchable: true, filterKey: "item_name", type: "text" },
    { key: "weight", type: "text" },
    { key: "rate", type: "text" },
  ],
};

export const LabourerAssignPlotList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "ASSIGNED PLOT LIST",
  Button_Title: "ASSIGN PLOT ADD",

  header: [
    { title: "LABOURER NAME" },
    { title: "PLOT NAME" },
    { title: "IS ACTIVE" },
  ],

  body: [
    { key: "labourer_name", isSearchable: true, filterKey: "labourer_name", type: "text" },
    { key: "plot_name", isSearchable: true, filterKey: "plot_name", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
};

export const SupplierAddressList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "SUPPLIER ADDRESS LIST",
  Button_Title: "SUPPLIER ADDRESS ADD",

  header: [
    { title: "SUPPLIER NAME" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],

  body: [
    { key: "supplier_name", type: "text" },
    { key: "address", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
};

export const SupplierPaymentList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "SUPPLIER PAYMENT LIST",
  Button_Title: "SUPPLIER PAYMENT ADD",

  header: [
    { title: "SUPPLIER NAME" },
    { title: "TYPE" },
    { title: "DIRECTION" },
    { title: "AMOUNT" },
    { title: "DATE" },
    { title: "REMARKS" },
  ],

  body: [
    { key: "supplier_name", isSearchable: true, filterKey: "supplier_name", type: "text" },
    { key: "payment_type", isSearchable: true, filterKey: "payment_type", type: "text" },
    { key: "payment_direction", isSearchable: true, filterKey: "payment_direction", type: "text" },
    { key: "amount", type: "text" },
    { key: "payment_date", type: "date" },
    { key: "note", type: "text" },
  ],
};

export const SupplierItemPriceList = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "SUPPLIER ITEM PRICE LIST",
  Button_Title: "SUPPLIER ITEM PRICE ADD",

  header: [
    { title: "SUPPLIER NAME" },
    { title: "ITEM NAME" },
    { title: "WEIGHT" },
    { title: "RATE" },
  ],

  body: [
    { key: "supplier_name", isSearchable: true, filterKey: "supplier_name", type: "text" },
    { key: "item_name", isSearchable: true, filterKey: "item_name", type: "text" },
    { key: "weight", type: "text" },
    { key: "rate", type: "text" },
  ],
};

export const TableContent = {
  DriverList,
  VehicleList,
  CustomerList,
  SupplierList,
  ItemList,
  PlotList,
  PartnerList,
  TransporterList,
  LabourerList,
  LabourPlotAssignmentList,
  CustomerAddressList,
  CustomerPaymentList,
  CustomerItemPriceList,
  LabourerAssignPlotList ,
  SupplierAddressList,
  SupplierPaymentList,
  SupplierItemPriceList
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
    { title: "OWNER NAME" },
    { title: "VEHICLE CATEGORIES" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "vehicle_number", type: "text" },
    { key: "owner_name", type: "select", api: "OwnerList", labelKey: "name", valueKey: "name", },
    { key: "is_private", type: "Boolean" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdateCustomer = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "CUSTOMER LIST",
  Button_Title: "CUSTOMER ADD",
  header: [
    { title: "CUSTOMER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "email", isSearchable: true, filterKey: "search", type: "text" },
    { key: "company_name", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdateSupplier = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "SUPPLIER LIST",
  Button_Title: "SUPPLIER ADD",
  header: [
    { title: "SUPPLIER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "email", isSearchable: true, filterKey: "search", type: "text" },
    { key: "company_name", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdateItem = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "ITEM LIST",
  Button_Title: "ITEM ADD",
  header: [
    { title: "ITEM NAME" },
    { title: "UNIT" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "unit", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdatePlot = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "PLOT LIST",
  Button_Title: "PLOT ADD",
  header: [
    { title: "PLOT NAME" },
    { title: "PLOT NAME" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "plot_number", isSearchable: true, filterKey: "search", type: "text" },
    { key: "plot_name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "address", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdatePartner = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "PARTNER LIST",
  Button_Title: "PARTNER ADD",
  header: [
    { title: "PARTNER NAME" },
    { title: "MOBILE NO" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdateTransporter = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "TRANSPORTER LIST",
  Button_Title: "TRANSPORTER ADD",
  header: [
    { title: "TRANSPORTER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "BANK NAME" },
    { title: "ACCOUNT NO" },
    { title: "IFSC CODE" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "email", type: "text" },
    { key: "company_name", type: "text" },
    { key: "bank_name", type: "text" },
    { key: "account_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "ifsc_code", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdateLabourer = {
  noDataText: "No Matching Data Found",
  withFilters: true,
  Header_Title: "LABOURER LIST",
  Button_Title: "LABOURER ADD",
  header: [
    { title: "LABOURER NAME" },
    { title: "MOBILE NO" },
    { title: "AADHAR NO" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "aadhar_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdateCustomerAddress = {
  header: [
    { title: "CUSTOMER NAME" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "customer_id", type: "select", api: "CustomerList", valueKey: "id", labelKey: "name", valueType: "number" },
    { key: "address", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const UpdateCustomerPayment = {
  header: [
    { title: "CUSTOMER NAME" },
    { title: "TYPE" },
    { title: "DIRECTION" },
    { title: "AMOUNT" },
    { title: "DATE" },
    { title: "REMARKS" },
  ],
  body: [{ key: "customer_id", type: "select", api: "CustomerList", valueKey: "id", labelKey: "name" },
  {
    key: "payment_type", type: "selectStatic", options: [
      { value: "Cash", label: "Cash" },
      { value: "Online", label: "Online" },
    ]
  },
  {
    key: "payment_direction", type: "selectStatic", options: [
      { value: "Credit", label: "Credit" },
      { value: "Debit", label: "Debit" },
    ]
  },
  { key: "amount", type: "number" }, // Number input 
  { key: "payment_date", type: "date" }, // Calendar picker
  { key: "note", type: "text" },
  ],
};

export const UpdateCustomerItemPrice = {
  header: [
    { title: "CUSTOMER NAME" },
    { title: "ITEM NAME" },
    { title: "WEIGHT" },
    { title: "RATE" },
  ],
  body: [
    { key: "customer_id", type: "select", api: "CustomerList", valueKey: "id", labelKey: "name" },
    { key: "item_id", type: "select", api: "ItemList", valueKey: "id", labelKey: "name" },
    { key: "weight", type: "number" },
    { key: "rate", type: "number" },
  ],
};

export const UpdateLabourerAssignPlot = {
  header: [
    { title: "LABOURER NAME" },
    { title: "PLOT NAME" },
    { title: "IS ACTIVE" },
  ],

  body: [
    { key: "labourer_id",type: "select",api: "LabourerList",  valueKey: "id", labelKey: "name"  },
    {  key: "plot_id", type: "select",api: "PlotList",  valueKey: "id", labelKey: "plot_name" },
    { key: "is_active", type: "Boolean" },
  ],
};

export const UpdateSupplierAddress = {
  header: [
    { title: "SUPPLIER NAME" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    {
      key: "supplier_id",
      type: "select",
      api: "SupplierList",
      valueKey: "id",
      labelKey: "name",
      valueType: "number"
    },
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
};

export const UpdateSupplierPayment = {
  header: [
    { title: "SUPPLIER NAME" },
    { title: "TYPE" },
    { title: "DIRECTION" },
    { title: "AMOUNT" },
    { title: "DATE" },
    { title: "REMARKS" },
  ],

  body: [
    {
      key: "supplier_id",
      type: "select",
      api: "SupplierList",
      valueKey: "id",
      labelKey: "name"
    },
    {
      key: "payment_type",
      type: "selectStatic",
      options: [
        { value: "Cash", label: "Cash" },
        { value: "Online", label: "Online" },
      ]
    },
    {
      key: "payment_direction",
      type: "selectStatic",
      options: [
        { value: "Credit", label: "Credit" },
        { value: "Debit", label: "Debit" },
      ]
    },
    { key: "amount", type: "number" },
    { key: "payment_date", type: "date" },
    { key: "note", type: "text" },
  ],
};

export const UpdateSupplierItemPrice = {
  header: [
    { title: "SUPPLIER NAME" },
    { title: "ITEM NAME" },
    { title: "WEIGHT" },
    { title: "RATE" },
  ],

  body: [
    {
      key: "supplier_id",
      type: "select",
      api: "SupplierList",
      valueKey: "id",
      labelKey: "name"
    },
    {
      key: "item_id",
      type: "select",
      api: "ItemList",
      valueKey: "id",
      labelKey: "name"
    },
    { key: "weight", type: "number" },
    { key: "rate", type: "number" },
  ],
};

export const EditConfig = {
  Driver: {
    header: UpdateDriver.header,
    fields: UpdateDriver.body,
    detailApi: "DriverDetails",
    updateApi: "UpdateDriver",
    backUrl: "/admin-action/driver",
  },

  Vehicle: {
    header: UpdateVehicle.header,
    fields: UpdateVehicle.body,
    detailApi: "VehicleDetails",
    updateApi: "UpdateVehicle",
    backUrl: "/admin-action/vehicle",
  },

  Customer: {
    header: UpdateCustomer.header,
    fields: UpdateCustomer.body,
    detailApi: "CustomerDetails",
    updateApi: "UpdateCustomer",
    backUrl: "/admin-action/Customer",
  },

  Supplier: {
    header: UpdateSupplier.header,
    fields: UpdateSupplier.body,
    detailApi: "SupplierDetails",
    updateApi: "UpdateSupplier",
    backUrl: "/admin-action/Supplier",
  },

  Item: {
    header: UpdateItem.header,
    fields: UpdateItem.body,
    detailApi: "ItemDetails",
    updateApi: "UpdateItem",
    backUrl: "/admin-action/Item",
  },

  Plot: {
    header: UpdatePlot.header,
    fields: UpdatePlot.body,
    detailApi: "PlotDetails",
    updateApi: "UpdatePlot",
    backUrl: "/admin-action/Plot",
  },

  Partner: {
    header: UpdatePartner.header,
    fields: UpdatePartner.body,
    detailApi: "PartnerDetails",
    updateApi: "UpdatePartner",
    backUrl: "/admin-action/Partner",
  },

  Transporter: {
    header: UpdateTransporter.header,
    fields: UpdateTransporter.body,
    detailApi: "TransporterDetails",
    updateApi: "UpdateTransporter",
    backUrl: "/admin-action/Transporter",
  },

  Labourer: {
    header: UpdateLabourer.header,
    fields: UpdateLabourer.body,
    detailApi: "LabourerDetails",
    updateApi: "UpdateLabourer",
    backUrl: "/admin-action/Labourer",
  },

  CustomerAddress: {
    header: UpdateCustomerAddress.header,
    fields: UpdateCustomerAddress.body,
    detailApi: "CustomerAddressDetails",
    updateApi: "UpdateCustomerAddress",
    backUrl: "/admin-action/customer-addresses",
  },

  CustomerPayment: {
    header: UpdateCustomerPayment.header,
    fields: UpdateCustomerPayment.body,
    detailApi: "CustomerPaymentDetails",
    updateApi: "UpdateCustomerPayment",
    backUrl: "/admin-action/customer-payments",
  },

  CustomerItemPrice: {
    header: UpdateCustomerItemPrice.header,
    fields: UpdateCustomerItemPrice.body,
    detailApi: "CustomerItemPriceDetails",
    updateApi: "UpdateCustomerItemPrice",
    backUrl: "/admin-action/customer-item-prices",
  },

  LabourerAssignPlot: {
    header: UpdateLabourerAssignPlot.header,
    fields: UpdateLabourerAssignPlot.body,
    detailApi: "LabourerAssignPlotDetails",
    updateApi: "UpdateLabourerAssignPlot",
    backUrl: "/admin-action/labour-plot-assign",
  },

  SupplierAddress: {
    header: UpdateSupplierAddress.header,
    fields: UpdateSupplierAddress.body,
    detailApi: "SupplierAddressDetails",
    updateApi: "UpdateSupplierAddress",
    backUrl: "/admin-action/supplier-addresses",
  },
  
  SupplierPayment: {
    header: UpdateSupplierPayment.header,
    fields: UpdateSupplierPayment.body,
    detailApi: "SupplierPaymentDetails",
    updateApi: "UpdateSupplierPayment",
    backUrl: "/admin-action/supplier-payments",
  },
  
  SupplierItemPrice: {
    header: UpdateSupplierItemPrice.header,
    fields: UpdateSupplierItemPrice.body,
    detailApi: "SupplierItemPriceDetails",
    updateApi: "UpdateSupplierItemPrice",
    backUrl: "/admin-action/supplier-item-prices",
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

  Plot: {
    api: "DeletePlot",
    idField: "plot_id",
  },

  Partner: {
    api: "DeletePartner",
    idField: "partner_id",
  },

  Transporter: {
    api: "DeleteTransporter",
    idField: "transporter_id",
  },

  Labourer: {
    api: "DeleteLabourer",
    idField: "labourer_id",
  },

  CustomerAddress: {
    api: "DeleteCustomerAddress",
    idField: "customer_address_id",
  },

  CustomerPayment: {
    api: "DeleteCustomerPayment",
    idField: "customer_payment_id",
  },

  CustomerItemPrice: {
    api: "DeleteCustomerItemPrice",
    idField: "item_price_id",
  },

  LabourerAssignPlot: {
    api: "DeleteLabourerAssignPlot",
    idField: "assign_id",
  },

  SupplierAddress: {
    api: "DeleteSupplierAddress",
    idField: "supplier_address_id",
  },
  
  SupplierPayment: {
    api: "DeleteSupplierPayment",
    idField: "supplier_payment_id",
  },
  
  SupplierItemPrice: {
    api: "DeleteSupplierItemPrice",
    idField: "item_price_id",
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
    { title: "PASSWORD" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", type: "text" },
    { key: "mobile_no", type: "text" },
    { key: "email", type: "text" },
    { key: "license_no", type: "text" },
    { key: "aadhar_no", type: "text" },
    { key: "password", type: "text" },
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ]
};

export const VehicleADD = {
  Header_Title: "VEHICLE ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "VEHICLE NO" },
    { title: "OWNER NAME" },
    { title: "VEHICLE CATEGORIES" },
    { title: "IS ACTIVE" }
  ],
  body: [
    { key: "vehicle_number", type: "text" },
    { key: "Owner Name", type: "select", api: "OwnerList", labelKey: "name", valueKey: "name", },
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
    { title: "CUSTOMER TYPE" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", type: "text" },
    { key: "mobile_no", type: "text" },
    { key: "email", type: "text" },
    { key: "company_name", type: "text" },
    { key: "customer_type", type: "text" },
    { key: "is_active", type: "Boolean" },
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
    { key: "name", type: "text" },
    { key: "mobile_no", type: "text" },
    { key: "email", type: "text" },
    { key: "company_name", type: "text" },
    { key: "is_active", type: "Boolean" },
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
    { key: "name", type: "text" },
    { key: "unit", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const PlotADD = {
  Header_Title: "PLOT ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "PLOT NO" },
    { title: "PLOT NAME" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "plot_number", type: "text" },
    { key: "plot_name", type: "text" },
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const PartnerADD = {
  Header_Title: "PARTNER ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "PARTNER NAME" },
    { title: "MOBILE NO" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", type: "text" },
    { key: "mobile_no", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const TransporterADD = {
  Header_Title: "TRANSPORTER ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "TRANSPORTER NAME" },
    { title: "MOBILE NO" },
    { title: "EMAIL" },
    { title: "COMPANY NAME" },
    { title: "BANK NAME" },
    { title: "ACCOUNT NO" },
    { title: "IFSC CODE" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "email", type: "text" },
    { key: "company_name", type: "text" },
    { key: "bank_name", type: "text" },
    { key: "account_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "ifsc_code", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const LabourerADD = {
  Header_Title: "LABOURER ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "LABOURER NAME" },
    { title: "MOBILE NO" },
    { title: "AADHAR NO" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "name", isSearchable: true, filterKey: "search", type: "text" },
    { key: "mobile_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "aadhar_no", isSearchable: true, filterKey: "search", type: "text" },
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const CustomerAddressADD = {
  Header_Title: "CUSTOMER ADDRESS ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "CUSTOMER NAME" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    { key: "customer_id", type: "select", api: "CustomerList", valueKey: "id", labelKey: "name" },
    { key: "address", isSearchable: true, filterKey: "search", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
}

export const CustomerPaymentADD = {
  Header_Title: "CUSTOMER PAYMENT ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "CUSTOMER NAME" },
    { title: "TYPE" },
    { title: "DIRECTION" },
    { title: "AMOUNT" },
    { title: "DATE" },
    { title: "REMARKS" },
  ],

  body: [{ key: "customer_id", type: "select", api: "CustomerList", valueKey: "id", labelKey: "name" },
  {
    key: "payment_type", type: "selectStatic", options: [
      { value: "Cash", label: "Cash" },
      { value: "Online", label: "Online" },
    ]
  },
  {
    key: "payment_direction", type: "selectStatic", options: [
      { value: "Credit", label: "Credit" },
      { value: "Debit", label: "Debit" },
    ]
  },
  { key: "amount", type: "number" }, // Number input 
  { key: "payment_date", type: "date" }, // Calendar picker
  { key: "note", type: "text" },
  ],
};

export const CustomerItemPriceADD = {
  Header_Title: "CUSTOMER ITEM PRICE ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "CUSTOMER NAME" },
    { title: "ITEM NAME" },
    { title: "WEIGHT" },
    { title: "RATE" },
  ],
  body: [
    { key: "customer_id", type: "select", api: "CustomerList", valueKey: "id", labelKey: "name" },
    { key: "item_id", type: "select", api: "ItemList", valueKey: "id", labelKey: "name" },
    { key: "weight", type: "number" },
    { key: "rate", type: "number" },
  ],
};

export const LabourerAssignPlotADD = {
  Header_Title: "LABOURER ASSIGN PLOT ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "LABOURER NAME" },
    { title: "PLOT NAME" },
    { title: "IS ACTIVE" },
  ],

  body: [
    { key: "labourer_id",type: "select",api: "LabourerList",  valueKey: "id", labelKey: "name"  },
    { key: "plot_id", type: "select",api: "PlotList",  valueKey: "id", labelKey: "plot_name"},
    { key: "is_active", type: "Boolean" },
  ],
};

export const SupplierAddressADD = {
  Header_Title: "SUPPLIER ADDRESS ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "SUPPLIER NAME" },
    { title: "ADDRESS" },
    { title: "IS ACTIVE" },
  ],
  body: [
    {
      key: "supplier_id",
      type: "select",
      api: "SupplierList",
      valueKey: "id",
      labelKey: "name",
      valueType: "number"
    },
    { key: "address", type: "text" },
    { key: "is_active", type: "Boolean" },
  ],
};

export const SupplierPaymentADD = {
  Header_Title: "SUPPLIER PAYMENT ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "SUPPLIER NAME" },
    { title: "TYPE" },
    { title: "DIRECTION" },
    { title: "AMOUNT" },
    { title: "DATE" },
    { title: "REMARKS" },
  ],

  body: [
    {
      key: "supplier_id",
      type: "select",
      api: "SupplierList",
      valueKey: "id",
      labelKey: "name"
    },
    {
      key: "payment_type",
      type: "selectStatic",
      options: [
        { value: "Cash", label: "Cash" },
        { value: "Online", label: "Online" },
      ]
    },
    {
      key: "payment_direction",
      type: "selectStatic",
      options: [
        { value: "Credit", label: "Credit" },
        { value: "Debit", label: "Debit" },
      ]
    },
    { key: "amount", type: "number" },
    { key: "payment_date", type: "date" },
    { key: "note", type: "text" },
  ],
};

export const SupplierItemPriceADD = {
  Header_Title: "SUPPLIER ITEM PRICE ADD",
  Submit_Button: "SUBMIT DETAILS",
  header: [
    { title: "SUPPLIER NAME" },
    { title: "ITEM NAME" },
    { title: "WEIGHT" },
    { title: "RATE" },
  ],

  body: [
    {
      key: "supplier_id",
      type: "select",
      api: "SupplierList",
      valueKey: "id",
      labelKey: "name"
    },
    {
      key: "item_id",
      type: "select",
      api: "ItemList",
      valueKey: "id",
      labelKey: "name"
    },
    { key: "weight", type: "number" },
    { key: "rate", type: "number" },
  ],
};
export const ADDConfig = {

  Driver: {
    header: DriverADD.header,
    fields: DriverADD.body,
    Header_Title: DriverADD.Header_Title,
    Submit_Button: DriverADD.Submit_Button,

    AddApi: "AddDriver",

    backUrl: "/admin-action/Driver",
  },

  Vehicle: {
    header: VehicleADD.header,
    fields: VehicleADD.body,
    Header_Title: VehicleADD.Header_Title,
    Submit_Button: VehicleADD.Submit_Button,

    AddApi: "AddVehicle",

    backUrl: "/admin-action/Vehicle",
  },

  Customer: {
    header: CustomerADD.header,
    fields: CustomerADD.body,
    Header_Title: CustomerADD.Header_Title,
    Submit_Button: CustomerADD.Submit_Button,

    AddApi: "AddCustomer",

    backUrl: "/admin-action/Customer"
  },

  Supplier: {
    header: SupplierADD.header,
    fields: SupplierADD.body,
    Header_Title: SupplierADD.Header_Title,
    Submit_Button: SupplierADD.Submit_Button,

    AddApi: "AddSupplier",

    backUrl: "/admin-action/Supplier"
  },

  Item: {
    header: ItemADD.header,
    fields: ItemADD.body,
    Header_Title: ItemADD.Header_Title,
    Submit_Button: ItemADD.Submit_Button,

    AddApi: "AddItem",

    backUrl: "/admin-action/Item"
  },

  Plot: {
    header: PlotADD.header,
    fields: PlotADD.body,
    Header_Title: PlotADD.Header_Title,
    Submit_Button: PlotADD.Submit_Button,

    AddApi: "AddPlot",

    backUrl: "/admin-action/Plot"
  },

  Partner: {
    header: PartnerADD.header,
    fields: PartnerADD.body,
    Header_Title: PartnerADD.Header_Title,
    Submit_Button: PartnerADD.Submit_Button,

    AddApi: "AddPartner",

    backUrl: "/admin-action/Partner"
  },

  Transporter: {
    header: TransporterADD.header,
    fields: TransporterADD.body,
    Header_Title: TransporterADD.Header_Title,
    Submit_Button: TransporterADD.Submit_Button,

    AddApi: "AddTransporter",

    backUrl: "/admin-action/Transporter"
  },

  Labourer: {
    header: LabourerADD.header,
    fields: LabourerADD.body,
    Header_Title: LabourerADD.Header_Title,
    Submit_Button: LabourerADD.Submit_Button,

    AddApi: "AddLabourer",

    backUrl: "/admin-action/Labourer"
  },

  CustomerAddress: {
    header: CustomerAddressADD.header,
    fields: CustomerAddressADD.body,
    Header_Title: CustomerAddressADD.Header_Title,
    Submit_Button: CustomerAddressADD.Submit_Button,

    AddApi: "AddCustomerAddress",

    backUrl: "/admin-action/customer-addresses"
  },

  CustomerPayment: {
    header: CustomerPaymentADD.header,
    fields: CustomerPaymentADD.body,
    Header_Title: CustomerPaymentADD.Header_Title,
    Submit_Button: CustomerPaymentADD.Submit_Button,

    AddApi: "AddCustomerPayment",

    backUrl: "/admin-action/customer-payments"
  },

  CustomerItemPrice: {
    header: CustomerItemPriceADD.header,
    fields: CustomerItemPriceADD.body,
    Header_Title: CustomerItemPriceADD.Header_Title,
    Submit_Button: CustomerItemPriceADD.Submit_Button,

    AddApi: "AddCustomerItemPrice",

    backUrl: "/admin-action/customer-item-prices"
  },

  LabourerAssignPlot: {
    header: LabourerAssignPlotADD.header,
    fields: LabourerAssignPlotADD.body,
    Header_Title: LabourerAssignPlotADD.Header_Title,
    Submit_Button: LabourerAssignPlotADD.Submit_Button,

    AddApi: "AddLabourerAssignPlot",

    backUrl: "/admin-action/labour-plot-assign"
  },
  
  SupplierAddress: {
    header: SupplierAddressADD.header,
    fields: SupplierAddressADD.body,
    Header_Title: SupplierAddressADD.Header_Title,
    Submit_Button: SupplierAddressADD.Submit_Button,
    AddApi: "AddSupplierAddress",
    backUrl: "/admin-action/supplier-addresses",
  },
  
  SupplierPayment: {
    header: SupplierPaymentADD.header,
    fields: SupplierPaymentADD.body,
    Header_Title: SupplierPaymentADD.Header_Title,
    Submit_Button: SupplierPaymentADD.Submit_Button,
    AddApi: "AddSupplierPayment",
    backUrl: "/admin-action/supplier-payments",
  },
  
  SupplierItemPrice: {
    header: SupplierItemPriceADD.header,
    fields: SupplierItemPriceADD.body,
    Header_Title: SupplierItemPriceADD.Header_Title,
    Submit_Button: SupplierItemPriceADD.Submit_Button,
    AddApi: "AddSupplierItemPrice",
    backUrl: "/admin-action/supplier-item-prices",
  },
};



export const PAGE_SIZES = [3, 15, 20, 50, 100];

import { API_ENDPOINTS } from "@/providers/api/api-config";

export const relationshipConfig = {
  vehicleAssignment: {
    title: "Vehicle Assignment",

    listApi:
      API_ENDPOINTS.adminAction.getVehicleAssignmentList,

    createApi:
      API_ENDPOINTS.adminAction.vehicleAssignmentCreate,

    updateApi:
      API_ENDPOINTS.adminAction.vehicleAssignmentUpdate,

    deleteApi:
      API_ENDPOINTS.adminAction.vehicleAssignmentDelete,

    columns: [
      {
        key: "owner_name",
        label: "Owner",
      },
      {
        key: "vehicle_name",
        label: "Vehicle",
      },
      {
        key: "assignment_date",
        label: "Assignment Date",
      },
      {
        key: "status",
        label: "Status",
      },
    ],

    fields: [
      {
        name: "owner_id",
        label: "Owner",
        type: "dropdown",
      },
      {
        name: "vehicle_id",
        label: "Vehicle",
        type: "dropdown",
      },
      {
        name: "assignment_date",
        label: "Assignment Date",
        type: "date",
      },
      {
        name: "status",
        label: "Status",
        type: "dropdown",
      },
    ],
  },
};