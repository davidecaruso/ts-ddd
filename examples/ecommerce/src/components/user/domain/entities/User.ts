import * as t from 'io-ts'
import { domain } from '../../../../../../../src'
import { UserEmail } from '../value-objects/UserEmail'
import { UserFirstName } from '../value-objects/UserFirstName'
import { UserId } from '../value-objects/UserId'
import { UserLastName } from '../value-objects/UserLastName'

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
