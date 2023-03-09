import { application } from '../../../../../../../src'
import { Product } from '../../domain/entities/Product'

export interface ProductRepository extends application.persistence.Repository<Product> {}
