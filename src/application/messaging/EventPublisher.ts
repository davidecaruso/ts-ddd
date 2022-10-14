import { TaskEither } from 'fp-ts/TaskEither'
import { Logger } from '../logging'

export abstract class EventPublisher {
  constructor(protected logger: Logger) {}

  protected abstract publish<E>(e: E | ReadonlyArray<E>): TaskEither<Error, void>
}
