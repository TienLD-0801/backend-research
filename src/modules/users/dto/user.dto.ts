import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UserDto {
  @Length(1, 32, { message: 'The length of name invalid !' })
  @IsString()
  @IsNotEmpty({ message: 'Name is not empty !' })
  name: string;

  @MaxLength(50, { message: 'The length of email invalid !' })
  @IsEmail()
  @IsNotEmpty({ message: 'Email is not empty !' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is not empty !' })
  password: string;

  @IsOptional()
  date_of_birth: string;

  @IsOptional()
  card_id: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('VN', {
    message:
      'Invalid phone number or is not empty or min 10 character or not phone number VN!',
  })
  phone: string;

  @IsIn([0, 1], { message: 'Role must be either 0 or 1 !' })
  @IsOptional()
  role?: number;
}
