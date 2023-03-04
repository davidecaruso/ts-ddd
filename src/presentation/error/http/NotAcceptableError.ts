import { ClientError } from './ClientError'

export class NotAcceptableError extends ClientError {
  readonly _type = 'not-acceptable'
  readonly status = 406
}
