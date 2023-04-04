import { Dto } from '../dto'

export interface Service {
  execute<I extends Dto, O>(i: I): O
}
