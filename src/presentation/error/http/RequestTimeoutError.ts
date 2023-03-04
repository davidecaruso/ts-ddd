import { ClientError } from './ClientError'

export class RequestTimeoutError extends ClientError {
  readonly _type = 'request-timeout'
  readonly status = 408
}
