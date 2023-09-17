import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsAuthDto, UserProviderAuthDto } from './dto/userAuth.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/signin/credentials")
  signinCredentials(@Body() dto: UserCredentialsAuthDto) {
    return this.usersService.signinCredentials(dto)
  }

  @Post("/signup/credentials")
  async signupCredentials(@Body() dto: UserCredentialsAuthDto) {
    return this.usersService.signupCredentials(dto)
  }
}
