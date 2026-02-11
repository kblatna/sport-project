import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)

    // Povolení CORS
    app.enableCors({
        origin: [
            'http://localhost:8080',
            'http://localhost:5173',
            'https://mulda.netlify.app',
            /\.netlify\.app$/ // Povolí všechny Netlify subdomény
        ],
        credentials: true
    })

    // Globální prefix pro API (kromě health endpointů)
    app.setGlobalPrefix('api', {
        exclude: ['health', 'api']
    })

    // Globální validace DTOs
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    )

    // Start - musí naslouchat na 0.0.0.0 pro Render.com
    const port = configService.get<number>('port')!
    await app.listen(port, '0.0.0.0')
    console.log(`Application is running on: http://0.0.0.0:${port}`)
}
bootstrap().catch((error) => {
    console.error('Error during application bootstrap:', error)
})
