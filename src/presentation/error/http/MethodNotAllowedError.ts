import { ClientError } from './ClientError'

export class MethodNotAllowedError extends ClientError {
  readonly _type = 'method-not-allowed'
  readonly status = 405
}
