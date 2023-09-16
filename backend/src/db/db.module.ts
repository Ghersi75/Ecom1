import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { Db } from './db';
import { DbService } from './db.service';

@Module({
  controllers: [DbController],
  providers: [Db, DbService]
})
export class DbModule {}
