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