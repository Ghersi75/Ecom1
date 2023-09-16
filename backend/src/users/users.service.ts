import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserCredentialsAuthDto, UserProviderAuthDto } from './dto/userAuth.dto';

@Injectable()
export class UsersService {
  constructor(private database: DbService) {

  }

  async signinCredentials(dto: UserCredentialsAuthDto) {
    if (dto.provider !== "credentials") {
      const user = await this.database.connection.selectFrom("users").selectAll().where("email", "=", dto.email).executeTakeFirst()
    
      // If no user with current email is found, but user logged in with a provider, simply sign up with this email and any given info
      if (!user) {

        // return new BadRequestException("No user with given email found")
      }
  
      return JSON.stringify(user)
    }
    
  }

  async signupCredentials(dto: UserCredentialsAuthDto) {
    
  }
}
