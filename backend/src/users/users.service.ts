import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserCredentialsAuthDto, UserProviderAuthDto } from './dto/userAuth.dto';
import { hash, compare } from "bcrypt"

@Injectable()
export class UsersService {
  constructor(private database: DbService) {

  }

  async signinCredentials(dto: UserCredentialsAuthDto) {
    if (dto.provider !== "credentials") {
      return new BadRequestException("Wrong provider given")
    }

    if (!dto.email && !dto.username) {
      return new BadRequestException("No username or email given")
    }
    
    if (dto.email) {
      const user = await this.database.connection.selectFrom("Users").selectAll().where("Email", "=", dto.email).executeTakeFirst()
    
      // If no user with current email is found, but user logged in with a provider, simply sign up with this email and any given info
      if (!user) {
        return new BadRequestException({
          error: "No user with given email found"
        })
      }

      
      if (compare(dto.password, user.PasswordHash)) {
        return JSON.stringify({
          id: user.UserID,
          username: user.Username,
          email: user.Email,
          image: user.ProfilePicture
        })
      }
  
      return new UnauthorizedException({
        error: "Passwords do not match"
      })
    }

    if (dto.username) {
      const user = await this.database.connection.selectFrom("Users").selectAll().where("Username", "=", dto.username).executeTakeFirst()
    
      // If no user with current email is found, but user logged in with a provider, simply sign up with this email and any given info
      if (!user) {
        return new BadRequestException({
          error: "No user with given username found"
        })
      }

      if (compare(dto.password, user.PasswordHash)) {
        return JSON.stringify({
          id: user.UserID,
          username: user.Username,
          email: user.Email,
          image: user.ProfilePicture
        })
      }
  
      return new UnauthorizedException({
        error: "Passwords do not match"
      })
    }
      
    
  }

  async signupCredentials(dto: UserCredentialsAuthDto) {
    if (dto.provider !== "credentials") {
      return new BadRequestException("Wrong provider given")
    }

    if (!dto.password || !dto.email || !dto.username) {
      return new BadRequestException({
        error: "Username, Email, or Password missing."
      })
    }

    const hashedPass = await hash(dto.password, 12)
    try {
      const user = await this.database.connection.insertInto("Users").values({
        Username: dto.username,
        Email: dto.email,
        PasswordHash: hashedPass,
        Provider: dto.provider
      }).executeTakeFirst()

      console.log(user)
      return JSON.stringify({
        id: Number(user.insertId),
        username: dto.username,
        email: dto.email,
        image: null
      })
    } catch (e) {
      console.log(e)
      if (e.code === "ER_DUP_ENTRY") {
        return new BadRequestException({
          error: "Username or Email already in use"
        })
      }

      return new BadRequestException({
        error: "Creating user failed",
        detailed_error: e
      })
    }
    
  }
}
