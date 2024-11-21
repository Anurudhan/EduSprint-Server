export interface ProfileEntity {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: {
    avatar?: string;
    dateOfBirth: string;
  };
  userName: string;
  contact: {
    address: string;
    phone?: string;
  };
}
