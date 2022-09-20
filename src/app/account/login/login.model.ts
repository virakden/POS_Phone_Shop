

export interface LoginModel {
    email: string;
    password: string;
}

export interface LoginResponse {
    response: ResponseData;
    data: Data;
}

export interface ResponseData {
    status : number;
    message : string;
}

export interface Data {
    results: Token;
}

export interface Token {
    token: string;
    expireIn: Date;
}

export interface UserInfoResponse {
    id: number;
    employee_name: string;
    employee_email: string;
    employee_telephone: number;
}