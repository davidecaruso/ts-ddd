import { ClientError } from './client-error'

export class LengthRequiredError extends ClientError {
  readonly _type = 'length-required'
  readonly status = 411
}
