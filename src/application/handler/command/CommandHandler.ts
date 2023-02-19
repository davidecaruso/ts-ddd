import { Command } from '../../dto'

export interface CommandHandler<C extends Command, A> {
  (c: C): A
}
