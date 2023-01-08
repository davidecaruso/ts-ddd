import { Repository } from '../../../../../../../src/application/persistence'
import { User } from '../../domain/entities/User'

export interface UserRepository extends Repository<User> {}
