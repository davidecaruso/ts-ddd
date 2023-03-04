import { ClientError } from './ClientError'

export class LengthRequiredError extends ClientError {
  readonly _type = 'length-required'
  readonly status = 411
}
