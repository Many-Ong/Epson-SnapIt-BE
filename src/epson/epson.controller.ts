import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EpsonService } from './epson.service';
import { ResponseEntity } from 'libs/types/response.entity';
import { AuthDto } from 'libs/entities/src/epson/dto/auth.dto';

@ApiTags('Epson')
@Controller('epson')
@ApiExtraModels(AuthDto)
export class EpsonController {
  constructor(private readonly epsonService: EpsonService) {}

  @ApiOperation({
    summary: 'authentication',
  })
  @Post('authenticate')
  async authentication(@Body() authDto: AuthDto) {
    const authResponse = await this.epsonService.authentication(authDto.refreshToken);
    return ResponseEntity.OK_WITH(authResponse);
  }
}
