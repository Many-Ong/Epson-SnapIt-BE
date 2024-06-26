import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/src/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  imports: [],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
