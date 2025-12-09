
        
export enum Role {
  Learner = 'Learner',
  Instructor = 'Instructor',
  Admin = 'Admin',
}

/**
 * Represents the fundamental structure of an authenticated user.
 */
export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

/**
 * Represents the response structure after a successful login or signup API call.
 */
export interface AuthResponseModel {
  token: string;
  user: UserModel;
}
        
      