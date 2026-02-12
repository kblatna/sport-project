import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)

    // Enable CORS
    app.enableCors({
        origin: [
            'http://localhost:8080',
            'http://localhost:5173',
            'https://mulda.netlify.app',
            /\.netlify\.app$/ // Allow all Netlify subdomains
        ],
        credentials: true
    })

    // Global API prefix (excluding health endpoints)
    app.setGlobalPrefix('api', {
        exclude: ['health', 'api']
    })

    // Global DTO validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    )

    // Start - must listen on 0.0.0.0 for Render.com
    const port = configService.get<number>('port')!
    await app.listen(port, '0.0.0.0')
    console.log(`Application is running on: http://0.0.0.0:${port}`)
}
bootstrap().catch((error) => {
    console.error('Error during application bootstrap:', error)
})
