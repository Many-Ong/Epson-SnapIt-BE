import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @ApiPropertyOptional({
    description: 'The refresh token to obtain a new access token',
    type: String,
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
