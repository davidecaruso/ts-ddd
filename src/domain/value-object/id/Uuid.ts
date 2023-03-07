import * as t from 'io-ts'
import { stringify, v4, parse } from 'uuid'
import { InvalidUuidGivenError } from '../../error'
import { Id } from './Id'

export abstract class Uuid extends Id {
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

  equals(that: Uuid): boolean {
    return that.constructor === this.constructor && that.toString() === this.toString()
  }

  toString(): string {
    return this.value
  }

  toRaw(): unknown {
    return this.value
  }

  static get codec() {
    return new t.Type(
      this.name ?? Uuid.name,
      (u): u is typeof this => u instanceof this,
      (u, c) => {
        try {
          // @ts-ignore
          return t.success(new this(u as typeof this))
        } catch (error) {
          return t.failure(u, c)
        }
      },
      o => o.toString(),
    )
  }
}
