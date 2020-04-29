export const passwordTooShort = 'Password must be at least 8 characters long';
export const noCapital = 'Password must contain at least one capital letter';
export const noLowercase =
  'Password must contain at least one lowercase letter';
export const noNumber = 'Password must contain at least one number';
export const noSpecial = 'Password must contain at least one special character';

export const idError = (prefix: string, value: string) =>
  `Expected a uuid prefixed with ${prefix} but got ${value}.`;
export const emailError = (value: string) =>
  `Expected a valid email address but got ${value}.`;
export const abilityScoreError = (value: number) =>
  `Expected a number between 1 and 20 but got ${value}.`;
