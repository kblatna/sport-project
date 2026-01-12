import { Module } from '@nestjs/common'
import { TurnstileService } from './Turnstile.service'

@Module({
    providers: [TurnstileService],
    exports: [TurnstileService]
})
export class TurnstileModule { }
