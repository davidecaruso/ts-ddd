import { Id } from '../value-object'

export abstract class Event<A extends Id, T = string> {
  abstract readonly _type: T

  constructor(readonly id: A) {}

  equals(that: Event<A>) {
    return that.constructor === this.constructor && that.id.equals(this.id)
  }

  toJson(): Record<string, unknown> {
    const { id, ...props } = this

    return {
      ...props,
      id: id.toString(),
    }
  }
}
