import { ClientError } from './ClientError'

export class NotFoundError extends ClientError {
  readonly _type = 'not-found'
  readonly status = 404
}
