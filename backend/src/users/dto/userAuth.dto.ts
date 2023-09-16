import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator"
import { IsPasswordRequiredBasedOnProvider } from "./userAuthValidators"

// https://dev.to/sarathsantoshdamaraju/nestjs-and-class-validator-cheat-sheet-13ao#:~:text=%3A%20string%0A%7D-,Specific%20String,-//%20example.dto.ts

// When a user sign in, they may either sign in with they email and password, or simply email and outside provider through next auth
// Email and provider are always required, and password only required when provider == "credentials"
export class UserCredentialsAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches("credentials")
  provider: string;

  // This is optional only if provider is not "credentials", but this can be checked in the rest of the logic
  // Important fields are email and provider
  // Check if password is required or not based on provider
  @IsString()
  @IsNotEmpty()
  password: string
}

export class UserProviderAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(["google", "facebook"])
  provider: string;
}