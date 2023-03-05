import { EventEmitter } from 'events'
import { either, ioEither, task, taskEither } from 'fp-ts'
import { constant, constVoid, pipe } from 'fp-ts/function'
import { TaskEither } from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import { EventListener, EventPublisher } from '../../../../../src/application/event'
import { Logger } from '../../../../../src/application/logging'
import { AggregateRoot } from '../../../../../src/domain/entity'
import { DomainEvent, TypeOf } from '../../../../../src/domain/event'
import { Id } from '../../../../../src/domain/value-object'

export class InMemoryEventEmitterAdapter implements EventPublisher, EventListener {
  constructor(private emitter: EventEmitter, protected logger?: Logger) {}

  listen<E extends DomainEvent<Id, AggregateRoot<Id>>>(t: TypeOf<E>, callback: (e: E) => void) {
    return pipe(
      either.tryCatch(
        () => this.emitter.on(t, callback),
        err => new Error(`There was an error while listening "${t}" event: ${JSON.stringify(err)}`),
      ),
      either.map(constVoid),
    )
  }

  publish<E extends DomainEvent<Id, AggregateRoot<Id>>>(e: ReadonlyArray<E> | E): TaskEither<Error, void> {
    return pipe(
      t.readonlyArray(t.unknown).is(e) ? [...e] : [e],
      taskEither.traverseArray(event =>
        pipe(
          ioEither.tryCatch(
            () => this.emitter.emit(event._type, event),
            err => new Error(`There was an error while emitting "${event._type}" event: ${JSON.stringify(err)}`),
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
