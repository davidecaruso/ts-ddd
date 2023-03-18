import { ClientError } from './client-error'

export class NotAcceptableError extends ClientError {
  readonly _type = 'not-acceptable'
  readonly status = 406
}
