export type Environment = 'development' | 'production' | 'test'

export interface IConfig {
    nodeEnv: Environment
    port: number
    database: {
        uri: string
    }
    jwt: {
        secret: string
        expiresIn: string
        refreshExpiresIn: string
    }
    turnstile: {
        secret: string
    }
    mailgun: {
        apiKey: string
        domain: string
        from: string
    }
}

const VALID_ENVIRONMENTS = ['development', 'production', 'test'] as const

const isValidEnvironment = (env: string | undefined): env is Environment => {
    return env !== undefined && (VALID_ENVIRONMENTS as readonly string[]).includes(env)
}

export default (): IConfig => {
    const nodeEnv = isValidEnvironment(process.env.NODE_ENV)
        ? process.env.NODE_ENV
        : 'development'

    return {
        nodeEnv,
        port: parseInt(process.env.PORT ?? '3001', 10),
        database: {
            uri: process.env.MONGODB_URI ?? ''
        },
        jwt: {
            secret: process.env.JWT_SECRET ?? 'your-secret-key-change-in-production',
            expiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
            refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d'
        },
        turnstile: {
            secret: process.env.TURNSTILE_SECRET ?? ''
        },
        mailgun: {
            apiKey: process.env.MAILGUN_API_KEY ?? '',
            domain: process.env.MAILGUN_DOMAIN ?? '',
            from: process.env.MAILGUN_FROM ?? ''
        }
    }
}
