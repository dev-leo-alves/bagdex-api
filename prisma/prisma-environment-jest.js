import { TestEnvironment } from 'jest-environment-node';
import { v4 as uuid } from 'uuid';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { config } from 'dotenv';

const prismaCli = './node_modules/.bin/prisma';

config({
  path: resolve(__dirname, '..', '.env.test'),
});

class CustomEnvironment extends TestEnvironment {
  constructor(config) {
    super(config);
    this.schema = `code-schema_${uuid()}`;
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    execSync(`${prismaCli} migrate dev`);
  }
}

module.exports = CustomEnvironment;
