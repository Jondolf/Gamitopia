import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news-posts/news.module';

const connectionOptions = process.env.DATABASE_URL
  ? PostgressConnectionStringParser.parse(process.env.DATABASE_URL)
  : null;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'dist')
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connectionOptions?.host || 'localhost',
      port: +connectionOptions?.port || 5432,
      username: connectionOptions?.user || process.env.DB_USERNAME,
      password: connectionOptions?.password || process.env.DB_PASSWORD,
      database: connectionOptions?.database || process.env.DB_NAME,
      autoLoadEntities: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      }
    }),
    NewsModule,
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
