import { ClientError } from './client-error'

export class GoneError extends ClientError {
  readonly _type = 'gone'
  readonly status = 410
}
