import { ClientError } from './ClientError'

export class GoneError extends ClientError {
  readonly _type = 'gone'
  readonly status = 410
}
