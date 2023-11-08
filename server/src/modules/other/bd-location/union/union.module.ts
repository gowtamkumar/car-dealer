import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UnionController } from './controllers/union.controller'
import { UnionEntity } from './entities/union.entity'
import { UnionService } from './services/union.service'

@Module({
  imports: [TypeOrmModule.forFeature([UnionEntity])],
  controllers: [UnionController],
  providers: [UnionService],
  exports: [UnionService],
})
export class UnionModule {}
