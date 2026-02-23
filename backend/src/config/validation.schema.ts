import * as Joi from 'joi'

/**
 * Environment variables validation schema using Joi
 * Validates all required and optional environment variables at application startup
 */
export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development')
        .description('Application environment'),

    PORT: Joi.number()
        .port()
        .default(3001)
        .description('Application port'),

    MONGODB_URI: Joi.string()
        .uri()
        .required()
        .description('MongoDB connection string'),

    JWT_SECRET: Joi.string()
        .default('your-secret-key-change-in-production')
        .description('JWT secret key for token signing'),

    JWT_EXPIRES_IN: Joi.string()
        .default('15m')
        .description('JWT access token expiration time'),

    JWT_REFRESH_EXPIRES_IN: Joi.string()
        .default('7d')
        .description('JWT refresh token expiration time'),

    TURNSTILE_SECRET: Joi.string()
        .allow('')
        .default('')
        .description('Cloudflare Turnstile secret key'),

    MAILGUN_API_KEY: Joi.string()
        .default('')
        .description('Mailgun API key for email sending'),

    MAILGUN_DOMAIN: Joi.string()
        .default('')
        .description('Mailgun domain'),

    MAILGUN_FROM: Joi.string()
        .allow('')
        .email({ tlds: { allow: false } })
        .default('')
        .description('Default sender email address')
})

export const validationOptions: Joi.ValidationOptions = {
    allowUnknown: true,
    abortEarly: false
}
