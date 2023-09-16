import { Body, Controller, Post } from '@nestjs/common';
import { UserAuthDto } from './dto/userAuth.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/signin")
  signin(@Body() dto: UserAuthDto) {
    return this.usersService.signin()
  }

  @Post("/signup")
  async signup(@Body() dto: UserAuthDto) {

  }
}
