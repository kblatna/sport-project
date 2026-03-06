import { Module } from '@nestjs/common'
import { MailService } from './Mail.service'

@Module({
    providers: [MailService],
    exports: [MailService]
})
export class MailModule { }
