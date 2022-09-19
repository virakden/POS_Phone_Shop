

export interface Login {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  response: ResponseData;
  results: Token;
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

export interface UserInfo {
  profilePhoto?: string;
  employeeName?: string;
  
}