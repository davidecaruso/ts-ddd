import * as t from 'io-ts'

export abstract class ValueObject {
  protected abstract get codec(): t.Mixed

  public is(u: unknown) {
    return this.codec.is(u)
  }

  public decode(u: unknown) {
    return this.codec.decode(u)
  }

  public encode() {
    return this.codec.encode(this)
  }
}
