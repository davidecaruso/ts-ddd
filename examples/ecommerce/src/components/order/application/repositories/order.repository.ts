import { Repository } from '../../../core/application/repository'
import { Order } from '../../domain/entities/order'

export interface OrderRepository extends Repository<Order> {}
