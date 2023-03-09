import { application } from '../../../../../../../src'
import { User } from '../../domain/entities/User'

export interface UserRepository extends application.persistence.Repository<User> {}
