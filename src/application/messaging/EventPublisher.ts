import { TaskEither } from 'fp-ts/TaskEither'
import { Event } from '../../domain/event'
import { Id } from '../../domain/value-object'
import { Logger } from '../logging'

export abstract class EventPublisher {
  constructor(protected logger?: Logger) {}

  abstract publish<E extends Event<Id>>(e: E | ReadonlyArray<E>): TaskEither<Error, void>
}
