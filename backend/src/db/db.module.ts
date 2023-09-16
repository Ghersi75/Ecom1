import { Module, Global } from '@nestjs/common';
import { DbController } from './db.controller';
import { DbService } from './db.service';
import { db } from "./database"

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useValue: db,
    },
    DbService,
  ],
  exports: [DbService],
})
export class DbModule {}
