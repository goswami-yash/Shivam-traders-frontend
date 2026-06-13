export const DriverList = {
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
    { key: "name", isSearchable: true, filterKey: "search" },
    { key: "mobile_no", isSearchable: true, filterKey: "search" },
    { key: "email" },
    { key: "license_no" },
    { key: "aadhar_no" },
    { key: "address" },
    { key: "is_active" },
  ],
};

export const TableContent = {
  DriverList,
};



export const PAGE_SIZES = [10, 15, 20, 50, 100];
