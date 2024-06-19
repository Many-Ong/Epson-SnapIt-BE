import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PrintSettingDto {
  @ApiPropertyOptional({
    description: 'jobName',
    type: String,
    default: 'SampleJob1',
  })
  @IsOptional()
  @IsString()
  jobName?: string;

  @ApiPropertyOptional({
    description: 'printMode',
    type: String,
    default: 'document',
  })
  @IsOptional()
  @IsString()
  printMode?: string;
}
