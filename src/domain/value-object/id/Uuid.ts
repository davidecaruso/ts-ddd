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
}

export const UuidC = <A extends Uuid>(ctor: new (input?: string | Uuid) => A) =>
  new t.Type(
    ctor.name ?? Uuid.name,
    (u): u is A => u instanceof ctor,
    (u, c) => {
      try {
        return t.success(new ctor(u as A))
      } catch (error) {
        return t.failure(u, c)
      }
    },
    o => o.toString(),
  )
