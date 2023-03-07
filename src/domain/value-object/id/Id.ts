import * as t from 'io-ts'
import { ValueObject } from '../ValueObject'

export abstract class Id implements ValueObject {
  readonly _type!: string

  abstract equals(that: this): boolean

  abstract toString(): string

  abstract toRaw(): unknown

  protected static codec<A extends Id>(ctor: new (i: any) => A) {
    return new t.Type(
      this.name ?? Id.name,
      (u): u is A => u instanceof ctor,
      (u, c) => {
        try {
          return u instanceof this ? t.success(u) : t.success(new ctor(u))
        } catch (error) {
          return t.failure(u, c)
        }
      },
      o => o.toRaw(),
    )
  }
}
