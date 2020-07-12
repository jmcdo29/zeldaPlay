export interface GoogleModuleOptions {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  state: string;
  prompt: string;
  scope: string[];
  responseType: string;
}
