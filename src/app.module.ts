import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EpsonModule } from './epson/epson.module';
import { UserModule } from './user/user.module';
// import { DatabaseModule } from 'libs/modules/database/database..module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // DatabaseModule.forRoot(),
    UserModule,
    EpsonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
