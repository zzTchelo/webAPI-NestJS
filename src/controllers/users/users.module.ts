import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityUser } from 'src/db/entities/user.entity';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([entityUser])],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
