import { Event } from '../../domain/event'
import { Id } from '../../domain/value-object'

export abstract class ApplicationEvent<A extends Id> extends Event<A> {}
