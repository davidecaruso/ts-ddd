import { ClientError } from './ClientError'

export class PayloadTooLargeError extends ClientError {
  readonly _type = 'payload-too-large'
  readonly status = 413
}
