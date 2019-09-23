export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  consentToEmail: boolean;
  recoveryToken?: string;
  isActive: boolean;
  role: string[];
}
