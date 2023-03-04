import { ClientError } from './ClientError'

export class ExpectationFailedError extends ClientError {
  readonly _type = 'expectation-failed'
  readonly status = 417
}
