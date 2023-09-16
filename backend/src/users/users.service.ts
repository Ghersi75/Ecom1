import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private database: DbService) {

  }

  async signin() {
    const user = await this.database.connection.selectFrom("users").selectAll().executeTakeFirst()
    
    return JSON.stringify(user)
  }
}
