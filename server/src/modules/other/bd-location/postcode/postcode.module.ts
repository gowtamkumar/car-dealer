import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostcodeController } from './controllers/postcode.controller'
import { PostcodeEntity } from './entities/postcode.entity'
import { PostcodeService } from './services/postcode.service'

@Module({
  imports: [TypeOrmModule.forFeature([PostcodeEntity])],
  controllers: [PostcodeController],
  providers: [PostcodeService],
  exports: [PostcodeService],
})
export class PostcodeModule {}
