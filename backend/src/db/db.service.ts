import { Inject, Injectable } from '@nestjs/common';
import type { Kysely } from "kysely"
import { DB } from './types';

@Injectable()
export class DbService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Kysely<DB>) {

  }

  get connection() {
    return this.db;
  }
}
