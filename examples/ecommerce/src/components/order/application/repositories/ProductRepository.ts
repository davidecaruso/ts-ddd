import { Repository } from '../../../../../../../src/application/persistence'
import { Product } from '../../domain/entities/Product'

export interface ProductRepository extends Repository<Product> {}
