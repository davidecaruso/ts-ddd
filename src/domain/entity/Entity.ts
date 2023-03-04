import * as t from 'io-ts'
import { Id, IdC } from '../value-object'

export interface Entity<I extends Id> {
  readonly _type: string
  readonly id: I
}

export const EntityC = <I extends Id>(idC: IdC<I>, type: string) =>
  t.type({
    _type: t.literal(type),
    id: idC,
  })

export type TypeOf<E extends Entity<Id>> = E['_type']

export type IdOf<E extends Entity<Id>> = E['id']
