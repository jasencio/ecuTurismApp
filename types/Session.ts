export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
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
