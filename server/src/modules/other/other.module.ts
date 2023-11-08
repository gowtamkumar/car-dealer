import { Module } from '@nestjs/common'
import { BdLocationModule } from './bd-location/bd-location.module'
import { FeedBackModule } from './feedback/feedback.module'
import { FileModule } from './file/file.module'
import { TodoModule } from './todo/todo.module'

@Module({
  imports: [FileModule, FeedBackModule, BdLocationModule, TodoModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class OtherModule {}
