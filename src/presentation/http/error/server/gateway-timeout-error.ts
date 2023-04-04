import { ServerError } from './server-error'

export class GatewayTimeoutError extends ServerError {
  readonly _type = 'gateway-timeout'
  readonly status = 504
}
