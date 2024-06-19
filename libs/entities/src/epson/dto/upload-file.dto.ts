import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    description: 'Local file path to upload',
    example: './SampleDoc.pdf',
  })
  localFilePath: string;
}
