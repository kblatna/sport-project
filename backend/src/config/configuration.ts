export type Environment = 'development' | 'production' | 'test'

export interface IConfig {
    nodeEnv: Environment
    port: number
    database: {
        uri: string
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
