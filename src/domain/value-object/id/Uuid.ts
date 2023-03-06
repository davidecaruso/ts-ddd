import * as t from 'io-ts'
import { parse, stringify, v4 } from 'uuid'
import { Id } from './Id'

export abstract class Uuid extends Id {
  private readonly bytes: ArrayLike<number>

  constructor(input?: string | Uuid) {
    super()
    this.bytes = input instanceof Uuid ? input.bytes : undefined !== input ? parse(input) : v4(null, [])
  }

  equals(that: Id): boolean {
    return that instanceof Uuid && that.constructor === this.constructor && that.toString() === this.toString()
  }

  toString(): string {
    return stringify(this.bytes)
  }

  toRaw(): unknown {
    return this.bytes
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
