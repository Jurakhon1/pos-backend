import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRoleEnum } from '../../entities/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRoleEnum, example: 'waiter', required: false })
  @IsEnum(UserRoleEnum)
  @IsOptional()
  role?: UserRoleEnum;
}
