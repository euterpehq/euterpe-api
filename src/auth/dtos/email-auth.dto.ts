import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EmailSignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class EmailSignupDto extends EmailSignInDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}
