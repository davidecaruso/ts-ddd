import { ServerError } from './server-error'

export class BadGatewayError extends ServerError {
  readonly _type = 'bad-gateway'
  readonly status = 502
}
