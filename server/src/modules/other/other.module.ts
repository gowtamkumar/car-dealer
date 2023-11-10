import { Module } from '@nestjs/common'
import { BdLocationModule } from './bd-location/bd-location.module'
import { FileModule } from './file/file.module'

@Module({
  imports: [FileModule, BdLocationModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class OtherModule {}
