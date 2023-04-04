import { ClientError } from './client-error'

export class BadRequestError extends ClientError {
  readonly _type = 'bad-request'
  readonly status = 400
}
