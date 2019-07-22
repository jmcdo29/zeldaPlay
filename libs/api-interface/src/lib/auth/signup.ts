export interface Signup {
  email: string;
  password: string;
  confirmationPassword: string;
  firstName: string;
  lastName: string;
  consentToEmail: boolean;
  role: string[];
}
