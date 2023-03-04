import { ClientError } from './ClientError'

export class UnauthorizedError extends ClientError {
  readonly _type = 'unauthorized'
  readonly status = 401
}
