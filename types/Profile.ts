export interface ProfileResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
  }

  export type ProfileUpdateRequest = {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    passwordConfirmation?: string;
  };