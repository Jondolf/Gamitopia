const env = require('dotenv');
env.config();

const isProd = process.env.NODE_ENV === 'production';
const entitiesExtension = isProd ? 'js' : 'ts';
const entitiesDir = isProd ? 'dist' : 'src';
const migrationsDir = isProd ? 'dist/migrations/*.js' : 'src/migrations/*.ts';

module.exports = {
  type: 'postgres',
  entities: [`${__dirname}/${entitiesDir}/**/*.entity.${entitiesExtension}`],
  url: process.env.DATABASE_URL,
  migrations: [migrationsDir],
  cli: {
    migrationsDir: 'src/migration'
  }
};
