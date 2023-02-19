import { Query } from '../../dto'

export interface QueryHandler<Q extends Query, A> {
  (q: Q): A
}
