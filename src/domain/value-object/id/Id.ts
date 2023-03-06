import { ValueObject } from '../ValueObject'

export abstract class Id implements ValueObject {
  abstract readonly _type: string

  abstract equals(that: Id): boolean

  abstract toString(): string

  abstract toRaw(): unknown
}
