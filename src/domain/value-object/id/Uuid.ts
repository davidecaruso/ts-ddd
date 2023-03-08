import { stringify, v4, parse } from 'uuid'
import { InvalidUuidGivenError } from '../../error'
import { Id } from './Id'

export abstract class Uuid extends Id {
  abstract readonly _type: string
  private readonly value: string

  constructor(input?: string | Uuid) {
    super()

    try {
      this.value =
        input instanceof Uuid ? input.value : undefined !== input && parse(input) ? input : stringify(v4(null, []))
    } catch (e) {
      throw new InvalidUuidGivenError('The value must be a valid Uuid')
    }
  }

  toString(): string {
    return this.value
  }

  toRaw(): unknown {
    return this.value
  }
}
