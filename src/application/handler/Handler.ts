export interface Handler<I, O> {
  (i: I): O
}
