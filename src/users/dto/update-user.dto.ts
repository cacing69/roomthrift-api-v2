import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PickType } from '@nestjs/mapped-types';
import { IsDefined, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, [
  'firstname',
  'lastname',
] as const) {
  @ApiProperty()
  @IsDefined()
  @IsOptional()
  @IsEmail()
  email: string;
}
