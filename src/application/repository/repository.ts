import { Entity, TypeOf } from '../../domain/entity'
import { Id } from '../../domain/value-object'

export interface Repository<E extends Entity<Id>> {}

export type EntityOf<E extends Entity<Id>, R extends Repository<E>> = TypeOf<E>
