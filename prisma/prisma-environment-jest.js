const NodeEnvironment = require('jest-environment-node').default;
import { v4 as uuid } from 'uuid';
import { Client } from 'pg';
import { execSync } from 'child_process';
import { config } from 'dotenv';
import { resolve } from 'path';

config({
  path: resolve(__dirname, '..', '.env'),
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `code_schema_${uuid()}`;
    this.connectionString = `${process.env.DATABASE_URL}?schema=${this.schema}`;
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;
    execSync('prisma migrate dev');
  }

  // async teardown() {
  //   const client = new Client({
  //     connectionString: this.connectionString,
  //   });

  //   await client.connect();
  //   await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
  //   await client.end();
  // }
}

module.exports = CustomEnvironment;
