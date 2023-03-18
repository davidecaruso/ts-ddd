import { ClientError } from './client-error'

export class UpgradeRequiredError extends ClientError {
  readonly _type = 'upgrade-required'
  readonly status = 426
}
