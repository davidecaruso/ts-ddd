import { Command } from '../dto'
import { Handler } from './handler'

export interface CommandHandler<C extends Command, A> extends Handler<C, A> {
  handle(c: C): A
}
