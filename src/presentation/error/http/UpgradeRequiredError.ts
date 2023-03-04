import { ClientError } from './ClientError'

export class UpgradeRequiredError extends ClientError {
  readonly _type = 'upgrade-required'
  readonly status = 426
}
