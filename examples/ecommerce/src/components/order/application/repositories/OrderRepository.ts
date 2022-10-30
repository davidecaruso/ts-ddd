import { Repository } from '../../../../../../../src/application/persistence'
import { Order } from '../../domain/entities/Order'

export interface OrderRepository extends Repository<Order> {}
