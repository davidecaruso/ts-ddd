import { EventEmitter } from 'events'
import { either, ioEither, task, taskEither } from 'fp-ts'
import { constant, constVoid, pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { Listener, Publisher } from '../../../../../src/application/event'
import { Logger } from '../../../../../src/application/logging'
import { AggregateRoot } from '../../../../../src/domain/entity'
import { DomainEvent, TypeOf } from '../../../../../src/domain/event'

export class EventEmitterListenerPublisherAdapter implements Publisher, Listener {
  constructor(private emitter: EventEmitter, protected logger?: Logger) {}

  async listen<E extends DomainEvent<AggregateRoot>>(t: TypeOf<E>, callback: (e: E) => void) {
    return pipe(
      either.tryCatch(
        () => this.emitter.on(t, callback),
        err => new Error(`There was an error while listening "${t}" event: ${JSON.stringify(err)}`),
      ),
      either.match(either.throwError, constVoid),
    )
  }

  async publish<E extends DomainEvent<AggregateRoot>>(e: ReadonlyArray<E> | E) {
    return await pipe(
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
      taskEither.match(either.throwError, constVoid),
    )()
  }
}
