import { application } from '../../../../../../../src'
import { Order } from '../../domain/entities/Order'

export interface OrderRepository extends application.persistence.Repository<Order> {}
