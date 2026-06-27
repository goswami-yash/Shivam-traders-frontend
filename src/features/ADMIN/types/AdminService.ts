export interface getAdminList {
    key: string,
    pagenumber: number,
    pagesize: number,
    filters: Record<string, any> 
}

export interface UpdateDrivers{
    driver_id : number,
    name : string,
    mobile_no : string,
    email : string,
    license_no : string,
    aadhar_no : string,
    address : string,
    is_active : boolean
}

export interface TableColumn {
    key: string;
    label: string;
  }
  
  export interface FormField {
    name: string;
    label: string;
    type:
      | "text"
      | "number"
      | "date"
      | "dropdown"
      | "checkbox";
    options?: {
      label: string;
      value: string | number;
    }[];
  }
  
  export interface RelationshipConfig {
    title: string;
    listApi: string;
    createApi: string;
    updateApi: string;
    deleteApi: string;
  
    columns: TableColumn[];
    fields: FormField[];
  }