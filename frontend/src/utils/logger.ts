/**
 * Logger utility for application logging
 * Logs to console in development, can be extended for production error tracking (Sentry, etc.)
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LoggerOptions {
    context?: string
    metadata?: Record<string, unknown>
}

class Logger {
    private isDevelopment = import.meta.env.DEV

    error(message: string, error?: unknown, options?: LoggerOptions): void {
        if (this.isDevelopment) {
            console.error(
                this.formatMessage('error' as LogLevel, message, options),
                error || ''
            )
        }
        // TODO: In production, send to error tracking service (Sentry, LogRocket, etc.)
        // Example: Sentry.captureException(error, { contexts: { custom: options } })
    }

    warn(message: string, options?: LoggerOptions): void {
        if (this.isDevelopment) {
            console.warn(this.formatMessage('warn' as LogLevel, message, options))
        }
    }

    info(message: string, options?: LoggerOptions): void {
        if (this.isDevelopment) {
            console.info(this.formatMessage('info' as LogLevel, message, options))
        }
    }

    debug(message: string, options?: LoggerOptions): void {
        if (this.isDevelopment) {
            console.debug(this.formatMessage('debug' as LogLevel, message, options))
        }
    }

    private formatMessage(level: LogLevel, message: string, options?: LoggerOptions): string {
        const context = options?.context ? `[${options.context}]` : ''
        const metadata = options?.metadata ? JSON.stringify(options.metadata) : ''
        return `[${level.toUpperCase()}]${context} ${message} ${metadata}`.trim()
    }
}

export const logger = new Logger()
