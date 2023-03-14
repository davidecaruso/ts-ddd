import { domain } from '../../src'

class FooId extends domain.valueObject.IntegerId {
  readonly _type = 'foo-id'
}

class BarId extends domain.valueObject.IntegerId {
  readonly _type = 'bar-id'
}

declare const f: (a: FooId) => FooId

const fooId = new FooId(42)
const barId = new BarId(42)

f(fooId) // It works
// @ts-ignore
f(barId) // TS2345: Argument of type 'BarId' is not assignable to parameter of type 'FooId'. Types of property '_type' are incompatible.
