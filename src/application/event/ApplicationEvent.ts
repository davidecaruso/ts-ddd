import { Event } from '../../domain/event'
import { Id } from '../../domain/value-object'

export abstract class ApplicationEvent<I extends Id> extends Event<I> {}
