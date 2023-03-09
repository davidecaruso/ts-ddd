import { Command } from '../dto'
import { Handler } from './Handler'

export interface CommandHandler<C extends Command, A> extends Handler<C, A> {
  (c: C): A
}
