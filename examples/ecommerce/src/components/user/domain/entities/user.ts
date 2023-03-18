import * as t from 'io-ts'
import { domain } from '../../../../../../../src'
import { UserEmail } from '../value-objects/user-email'
import { UserFirstName } from '../value-objects/user-first-name'
import { UserId } from '../value-objects/user-id'
import { UserLastName } from '../value-objects/user-last-name'

export class User extends domain.entity.AggregateRoot<UserId> {
  readonly _type = 'user'
  readonly updatedAt: domain.valueObject.UpdatedAt

  constructor(
    readonly firstName: UserFirstName,
    readonly lastName: UserLastName,
    readonly email: UserEmail,
    readonly id: UserId = new UserId(),
    readonly createdAt: domain.valueObject.CreatedAt = new domain.valueObject.CreatedAt(),
    updatedAt?: domain.valueObject.UpdatedAt,
  ) {
    super(id)

    this.updatedAt = updatedAt ?? domain.valueObject.UpdatedAt.fromCreatedAt(createdAt)
  }

  static get codec() {
    return t.type({})
  }
}
