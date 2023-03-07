import * as t from 'io-ts'
import { AggregateRoot } from '../../../../../../../src/domain/entity'
import { CreatedAt, UpdatedAt } from '../../../../../../../src/domain/value-object'
import { UserEmail } from '../value-objects/UserEmail'
import { UserFirstName } from '../value-objects/UserFirstName'
import { UserId } from '../value-objects/UserId'
import { UserLastName } from '../value-objects/UserLastName'

export class User extends AggregateRoot<UserId> {
  readonly _type = 'user'
  readonly updatedAt: UpdatedAt

  constructor(
    readonly firstName: UserFirstName,
    readonly lastName: UserLastName,
    readonly email: UserEmail,
    readonly id: UserId = new UserId(),
    readonly createdAt: CreatedAt = new CreatedAt(),
    updatedAt?: UpdatedAt,
  ) {
    super(id)

    this.updatedAt = updatedAt ?? UpdatedAt.fromCreatedAt(createdAt)
  }

  static get codec() {
    return t.type({})
  }
}
