import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SearchModule } from 'src/search/search.module'
import { Category } from './entities/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), SearchModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule, CategoryService],
})
export class CategoryModule {}
