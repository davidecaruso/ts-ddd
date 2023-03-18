import * as t from 'io-ts'
import { ValueObject } from '../value-object'

export abstract class Id extends ValueObject {
  abstract toString(): string

  abstract toRaw(): unknown

  protected static codec() {
    return new t.Type(
      this.name ?? Id.name,
      (u): u is typeof this => u instanceof this,
      (u, c) => {
        try {
          return u instanceof this
            ? t.success(u)
            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              t.success(new this(u))
        } catch (error) {
          return t.failure(u, c)
        }
      },
      o => o.toRaw(),
    )
  }

  equals<I extends this>(that: I): boolean {
    return that._type === this._type && that.toString() === this.toString()
  }
}
