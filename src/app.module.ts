import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from 'libs/modules/database/database..module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // DatabaseModule.forRoot(),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
