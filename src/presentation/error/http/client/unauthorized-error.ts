import { ClientError } from './client-error'

export class UnauthorizedError extends ClientError {
  readonly _type = 'unauthorized'
  readonly status = 401
}
