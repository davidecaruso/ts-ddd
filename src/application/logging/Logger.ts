import { ReadonlyRecord } from 'fp-ts/ReadonlyRecord'
import { Task } from 'fp-ts/Task'

type Context = ReadonlyRecord<string, unknown>

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5424.html
 */
type Severity = 'debug' | 'info' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency'

export abstract class Logger {
  debug<M>(message: M, context?: Context) {
    return this.log('debug', message, context)
  }

  info<M>(message: M, context?: Context) {
    return this.log('debug', message, context)
  }

  notice<M>(message: M, context?: Context) {
    return this.log('debug', message, context)
  }

  warning<M>(message: M, context?: Context) {
    return this.log('debug', message, context)
  }

  error<M>(message: M, context?: Context) {
    return this.log('debug', message, context)
  }

  critical<M>(message: M, context?: Context) {
    return this.log('debug', message, context)
  }

  alert<M>(message: M, context?: Context) {
    return this.log('debug', message, context)
  }

  emergency<M>(message: M, context?: Context) {
    return this.log('debug', message, context)
  }

  protected abstract log<M>(severity: Severity, message: M, context?: Context): Task<void>
}
