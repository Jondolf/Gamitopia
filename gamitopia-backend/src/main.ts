import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as enforce from 'express-sslify';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

process.on('uncaughtException', (err) => { console.warn(err, false); });

async function bootstrap() {
  try {
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
  } catch (err) {
    console.error('Bootstrap error', err);
  }
}
bootstrap();
