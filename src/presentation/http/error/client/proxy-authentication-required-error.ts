import { ClientError } from './client-error'

export class ProxyAuthenticationRequiredError extends ClientError {
  readonly _type = 'proxy-authentication-required'
  readonly status = 407
}
