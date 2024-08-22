import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({ description: 'Email do usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Nome completo do usuario' })
  @IsString()
  @IsNotEmpty()
name: string;

  @ApiProperty({ description: 'Define se o usuario e adiministrador', default: false, })
  @IsBoolean()
  admin: boolean;

}
