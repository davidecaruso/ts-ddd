import { Command } from '../../dto'

export type CommandHandler<C extends Command, A> = (command: C) => A
