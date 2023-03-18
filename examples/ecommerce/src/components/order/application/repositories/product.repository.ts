import { Repository } from '../../../core/application/repository'
import { Product } from '../../domain/entities/product'

export interface ProductRepository extends Repository<Product> {}
