export interface ICreateAccount {
  email: string;
  firebaseId: string;
}

export interface IUpdateAccount {
  email?: string;
  firebaseId?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
}
