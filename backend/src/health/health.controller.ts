import { Controller, Get } from '@nestjs/common'

@Controller()
export class HealthController {
    @Get('health')
    health(): { status: string, timestamp: string } {
        return { status: 'ok', timestamp: new Date().toISOString() }
    }

    @Get('api')
    apiHealth(): { status: string, message: string } {
        return { status: 'ok', message: 'API is running' }
    }
}
