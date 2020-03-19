export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  jwt?: string;
  status: boolean;
  message: string;
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

export interface Status {
  message: string;
  status: boolean;
}

export interface UserResponse extends Status {
  account: Account;
}
