import { Body, Controller, Post } from '@nestjs/common';
import { UserAuthDto } from './dto/userAuth.dto';

@Controller('users')
export class UsersController {
  @Post("/signin")
  signin(@Body() dto: UserAuthDto) {
    return JSON.stringify(dto)
  }

  @Post("/signup")
  async signup(@Body() dto: UserAuthDto) {

  }
}
