import { Query } from '../../dto'

export interface QueryHandler<Q extends Query, A> {
  (query: Q): A
}
