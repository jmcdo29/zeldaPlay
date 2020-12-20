import { t } from '@deepkit/type';

export class OauthQueryParams {
  @t
  code: string;

  @t.optional
  state: string;
}
