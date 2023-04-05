import { Entity, TypeOf } from '../../domain/entity'

export interface Repository<E extends Entity> {}

export type EntityOf<E extends Entity, R extends Repository<E>> = TypeOf<E>
