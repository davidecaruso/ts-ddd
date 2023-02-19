import * as t from 'io-ts'
import { Id, IdC } from '../value-object'

export abstract class Entity<I extends Id> {
  readonly _type!: string

  constructor(readonly id: I) {}

  equals(that: Entity<I>): boolean {
    return that.constructor === this.constructor && that.id.equals(this.id)
  }
}

export const EntityC = <I extends Id>(idC: IdC<I>, type: string) =>
  t.type({
    _type: t.literal(type),
    id: idC,
  })

export type TypeOf<E extends Entity<Id>> = E['_type']

export type IdOf<E extends Entity<Id>> = E['id']
