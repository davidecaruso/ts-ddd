import { Query } from '../dto'
import { Handler } from './handler'

export interface QueryHandler<Q extends Query, A> extends Handler<Q, A> {
  handle(q: Q): A
}
