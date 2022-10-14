import { either } from 'fp-ts'
import { Uuid, UuidC } from './Uuid'

describe('Uuid', () => {
  const _: unique symbol = Symbol()
  class FooId extends Uuid {
    private readonly [_]!: typeof _
  }

  describe('equals', () => {
    test('comparing objects', () => {
      const id = '00000000-0000-0000-0000-000000000000'

      expect(new FooId().equals(new FooId())).toBeFalsy()
      expect(new FooId(id).equals(new FooId(id))).toBeTruthy()
    })
    test('comparing objects of different type', () => {
      const _: unique symbol = Symbol()
      class BarId extends Uuid {
        private readonly [_]!: typeof _
      }
      const id = '00000000-0000-0000-0000-000000000000'

      expect(new FooId(id).equals(new BarId(id))).toBeFalsy()
    })
  })

  describe('UuidC', () => {
    test('decoding a Uuid', () => {
      const id = new FooId()

      expect(UuidC(FooId).decode(id)).toStrictEqual(either.of(id))
    })
    test('decoding a string', () => {
      const id = '00000000-0000-0000-0000-000000000000'

      expect(UuidC(FooId).decode(id)).toStrictEqual(either.of(new FooId(id)))
    })
    test('failing with an invalid string', () => {
      expect(
        UuidC(FooId).decode('123456789012345678901234567890')._tag
      ).toStrictEqual('Left')
    })
    test('failing with a non-hexadecimal string', () => {
      const id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

      expect(UuidC(FooId).decode(id)._tag).toStrictEqual('Left')
    })
    test('encoding to string', () => {
      const id = '00000000-0000-0000-0000-000000000000'

      expect(UuidC(FooId).encode(new FooId(id))).toStrictEqual(id)
    })
  })
})
