import { f } from '@marcj/marshal';

export class OauthQueryParams {
  @f
  code: string;

  @f.optional()
  state: string;
}
