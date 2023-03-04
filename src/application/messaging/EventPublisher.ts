import { TaskEither } from 'fp-ts/TaskEither'
import { AggregateRoot } from '../../domain/entity'
import { DomainEvent } from '../../domain/event'
import { Id } from '../../domain/value-object'
import { Logger } from '../logging'

export abstract class EventPublisher {
  constructor(protected logger?: Logger) {}

  abstract publish<E extends DomainEvent<Id, AggregateRoot<Id>>>(e: E | ReadonlyArray<E>): TaskEither<Error, void>
}
