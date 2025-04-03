export interface SignupRequest {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  id: string;
  name: string;
  email: string;
  roles: Array<RoleType>;
  token: string;
  expiresIn: number;
}

export enum RoleType {
  ADMIN_SYSTEM = "ADMIN_SYSTEM",
  ADMIN_COMPANY  = "ADMIN_COMPANY",
  TOURIST_GUIDE  = "TOURIST_GUIDE",
  TOURIST  = "TOURIST",
}
