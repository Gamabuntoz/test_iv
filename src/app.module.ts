import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { UserRepository } from './users/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { BasicStrategy } from './security/basic.strategy';
import { FilesService } from './files/files.service';
import * as process from 'process';

@Module({
  imports: [
    //TODO: ForRootAsync
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    UserRepository,
    //TODO: Bearer strategy
    BasicStrategy,
    FilesService,
  ],
})
export class AppModule {}
