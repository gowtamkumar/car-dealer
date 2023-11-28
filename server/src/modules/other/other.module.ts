import { Module } from '@nestjs/common'
import { BdLocationModule } from './bd-location/bd-location.module'
import { FileModule } from './file/file.module'
import { SettingModule } from './setting/setting.module'
import { MailModule } from './mail/mail.module'

@Module({
  imports: [FileModule, BdLocationModule, SettingModule, MailModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class OtherModule {}
