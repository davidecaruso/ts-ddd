export interface Handler<I, O> {
  handle(i: I): O
}
