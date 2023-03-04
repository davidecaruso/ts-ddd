import { ServerError } from './ServerError'

export class GatewayTimeoutError extends ServerError {
  readonly _type = 'gateway-timeout'
  readonly status = 504
}
