export interface FieldConfig {
    name: string;
    label: string;
    type:
      | "text"
      | "number"
      | "email"
      | "password"
      | "textarea"
      | "checkbox"
      | "select";
  
    options?: {
      label: string;
      value: string | number;
    }[];
  }
  
  export interface MasterConfig {
    title: string;
    api: string;
  
    columns: {
      key: string;
      label: string;
    }[];
  
    fields: FieldConfig[];
  }

  