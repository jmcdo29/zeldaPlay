export interface GoogleSub {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  photos: { value: string }[];
  provider: string;
  emails: { value: string; verified: boolean }[];
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
    email: string;
    email_verified: boolean;
  };
}
