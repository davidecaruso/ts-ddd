import { Query } from '../dto'
import { Handler } from './Handler'

export interface QueryHandler<Q extends Query, A> extends Handler<Q, A> {
  (q: Q): A
}
