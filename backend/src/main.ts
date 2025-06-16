import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)

    // Povolení CORS
    app.enableCors({
        origin: ['http://localhost:5173'], // nebo ['*'] během vývoje
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
    await app.listen(process.env.PORT ?? 3002)
}
bootstrap().catch((error) => {
    console.error('Error during application bootstrap:', error)
})
