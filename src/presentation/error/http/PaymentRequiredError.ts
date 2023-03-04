import { ClientError } from './ClientError'

export class PaymentRequiredError extends ClientError {
  readonly _type = 'payment-required'
  readonly status = 402
}
