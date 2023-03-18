import { Repository } from '../../../core/application/repository'
import { User } from '../../domain/entities/user'

export interface UserRepository extends Repository<User> {}
