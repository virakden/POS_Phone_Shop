export interface employeeModel {

  // name: string;
  // img?: string;
  // position: string;
  // phone: string;
  // date: string;
  // // status: string;
  // statusClass: string;
  // isSelected?:any;

  id: number;
  created_by_id: number;
  date_created: Date;
  status: string;
  last_updated: Date;
  updated_by_id: number;
  employee_name: string;
  employee_email: string;
  employee_telephone: string;
  join_date: Date;
  profile_photo: string;
}

export interface EmpModel{
  id:string;
  name:string;
  age?:number;
}