import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EpsonService } from './epson.service';
import { ResponseEntity } from 'libs/types/response.entity';
import { AuthDto } from 'libs/entities/src/epson/dto/auth.dto';
import { PrintMode } from 'libs/types/epson';

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

  @ApiOperation({
    summary: 'get device print capabilities',
  })
  @Get('capability')
  async getDevicePrintCapabilities(
    @Query('access-token') accessToken: string,
    @Query('print-mode') printMode: PrintMode,
  ) {
    const res = await this.epsonService.getDevicePrintCapabilities(accessToken, printMode);
    return ResponseEntity.OK_WITH(res);
  }
}
