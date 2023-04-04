import { ClientError } from './client-error'

export class MethodNotAllowedError extends ClientError {
  readonly _type = 'method-not-allowed'
  readonly status = 405
}
