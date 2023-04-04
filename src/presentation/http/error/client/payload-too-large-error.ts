import { ClientError } from './client-error'

export class PayloadTooLargeError extends ClientError {
  readonly _type = 'payload-too-large'
  readonly status = 413
}
