import * as t from 'io-ts'
import { ValueObject } from '../ValueObject'

export abstract class Id implements ValueObject {
  abstract readonly _type: string

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
            : // @ts-ignore
              t.success(new this(u))
        } catch (error) {
          return t.failure(u, c)
        }
      },
      o => o.toRaw(),
    )
  }

  equals<I extends this>(that: I): boolean {
    return that.toString() === this.toString()
  }

  strictEquals<I extends this>(that: I): boolean {
    return that._type === this._type && that.toString() === this.toString()
  }
}
