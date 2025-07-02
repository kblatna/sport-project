import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)

    // Povolení CORS
    app.enableCors({
        origin: ['http://localhost:8080', 'http://localhost:5173'], // frontend porty
        credentials: true
    })

    // Globální prefix pro API
    app.setGlobalPrefix('api')

    // Globální validace DTOs
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    )

    // Start
    await app.listen(process.env.PORT ?? 3001)
}
bootstrap().catch((error) => {
    console.error('Error during application bootstrap:', error)
})
