import { Either } from 'fp-ts/Either'
import { AggregateRoot } from '../../domain/entity'
import { DomainEvent, TypeOf } from '../../domain/event'
import { Id } from '../../domain/value-object'

export interface EventListener {
  listen<E extends DomainEvent<Id, AggregateRoot<Id>>>(t: TypeOf<E>, callback: (e: E) => void): Either<Error, void>
}
