import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

const connectionModule = TypeOrmModule.forRootAsync({
  useFactory: () => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      dropSchema: false,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
    };
  },
});

@Module({
  imports: [connectionModule],
  exports: [connectionModule],
})
export class DatabaseModule {
  public static forRoot(): DynamicModule {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();

    return {
      module: DatabaseModule,
    };
  }
}
