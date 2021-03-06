export interface User {
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  phone?: string;
  isMobile?: boolean;
  isMobileVerified?: boolean;
  role?: string;
  address1?: string;
  address2?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
  jwt?: string;
  status: boolean;
  message: string;
}

export interface Status {
  message: string;
  status: boolean;
}

export interface AccountResponse extends Status {
  account: User;
}

export interface AccountsResponse {
  accounts: Array<User>;
}

export interface UserCredential {
  email: string;
  password: string;
}

export interface CreateUserRequest extends UserCredential {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  isMobile: boolean;
  isMobileValidated: boolean;
}

export interface Account extends UserCredential {
  jwt: string;
}

export interface UserResponse extends Status {
  account: Account;
}

export enum Permission {
  USER = 'USER',
  HOST = 'HOST',
  ADMIN = 'ADMIN'
}
