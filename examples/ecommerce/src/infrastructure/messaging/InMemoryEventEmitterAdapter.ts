import { EventEmitter } from 'events'
import { ioEither, task, taskEither } from 'fp-ts'
import { constant, constVoid, pipe } from 'fp-ts/function'
import { TaskEither } from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import { Logger } from '../../../../../src/application/logging'
import { EventPublisher } from '../../../../../src/application/messaging'
import { AggregateRoot } from '../../../../../src/domain/entity'
import { DomainEvent } from '../../../../../src/domain/event'
import { Id } from '../../../../../src/domain/value-object'

export class InMemoryEventEmitterAdapter extends EventPublisher {
  constructor(private emitter: EventEmitter, protected logger?: Logger) {
    super(logger)
  }

  listen(event: string, callback: (...args: any[]) => void) {
    this.emitter.on(event, callback)
  }

  publish<E extends DomainEvent<Id, AggregateRoot<Id>>>(e: ReadonlyArray<E> | E): TaskEither<Error, void> {
    return pipe(
      t.readonlyArray(t.unknown).is(e) ? [...e] : [e],
      taskEither.traverseArray(event =>
        pipe(
          ioEither.tryCatch(
            () => this.emitter.emit(event._type, event.toJson()),
            err =>
              new Error(
                `There was an error during the emission for the event "${event._type}": ${JSON.stringify(err)}`,
              ),
          ),
          taskEither.fromIOEither,
          taskEither.chainTaskK(
            constant(
              this.logger?.debug(
                `Event published: ${JSON.stringify({
                  id: event.id,
                  type: event._type,
                  ...(event instanceof DomainEvent && {
                    layer: 'domain',
                    aggregateId: event._aggregateId,
                    aggregateType: event._aggregateType,
                  }),
                })}`,
              ) ?? task.of(constVoid()),
            ),
          ),
        ),
      ),
      taskEither.map(constVoid),
    )
  }
}
