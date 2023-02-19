import { Id } from '../value-object'

export abstract class Event<I extends Id> {
  readonly _type!: string

  constructor(readonly id: I) {}

  equals(that: Event<I>) {
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
