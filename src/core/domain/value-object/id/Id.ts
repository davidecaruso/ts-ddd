import { ValueObject } from '../ValueObject'

export abstract class Id extends ValueObject {
  abstract equals(that: Id): boolean

  abstract toString(): string

  abstract toRaw(): unknown
}
