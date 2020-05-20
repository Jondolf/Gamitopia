import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as enforce from 'express-sslify';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  if (
    process.env
      .NODE_ENV /* can be any Heroku's env variable, just checking that it's not localhost */
  ) {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  } // redirects HTTP to HTTPS
  app.use(compression());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
