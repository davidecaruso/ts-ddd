import { Level, P } from 'pino'
import { Logger } from '../../../../../src/application/logging'
import { LoggerSeverity } from '../../../../../src/application/logging/Logger'

export class PinoLoggerAdapter extends Logger {
  constructor(protected pino: P.Logger) {
    super()
  }

  protected log<M>(severity: LoggerSeverity, message: M): void {
    return this.pino[
      (
        {
          debug: 'debug',
          info: 'info',
          notice: 'info',
          warning: 'warn',
          error: 'error',
          critical: 'error',
          alert: 'error',
          emergency: 'fatal',
        } as Record<LoggerSeverity, Level>
      )[severity]
    ](message)
  }
}
