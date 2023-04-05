import { AggregateRoot } from '../../domain/entity'
import { DomainEvent, TypeOf } from '../../domain/event'

export interface Listener {
  listen<E extends DomainEvent<AggregateRoot>>(t: TypeOf<E>, callback: (e: E) => void): Promise<void>
}
