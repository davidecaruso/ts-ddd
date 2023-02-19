/**
 * @see https://datatracker.ietf.org/doc/html/rfc5424.html
 */
export type LoggerSeverity = 'debug' | 'info' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency'

export abstract class Logger {
  debug<M>(message: M) {
    return this.log('debug', message)
  }

  info<M>(message: M) {
    return this.log('debug', message)
  }

  notice<M>(message: M) {
    return this.log('debug', message)
  }

  warning<M>(message: M) {
    return this.log('debug', message)
  }

  error<M>(message: M) {
    return this.log('debug', message)
  }

  critical<M>(message: M) {
    return this.log('debug', message)
  }

  alert<M>(message: M) {
    return this.log('debug', message)
  }

  emergency<M>(message: M) {
    return this.log('debug', message)
  }

  protected abstract log<M>(severity: LoggerSeverity, message: M): void
}
