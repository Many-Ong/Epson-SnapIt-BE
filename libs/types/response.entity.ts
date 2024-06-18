import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';

export class ResponseEntity<T> {
  @ApiProperty({ type: Number, description: '응답코드', nullable: false })
  @Expose()
  private readonly statusCode: number;

  @ApiProperty({ type: String, description: '메시지' })
  @Expose()
  private readonly message: string;

  @ApiProperty({ description: '응답Data' })
  @Expose()
  private readonly data: T;

  private constructor(status: HttpStatus, message: string, data: T) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }

  static OK(): ResponseEntity<string> {
    return new ResponseEntity<string>(HttpStatus.OK, '', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.OK, '', data);
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러가 발생했습니다.', '');
  }

  static ERROR_WITH(message: string, code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR): ResponseEntity<string> {
    return new ResponseEntity<string>(code, message, '');
  }

  static ERROR_WITH_DATA<T>(message: string, code: HttpStatus = HttpStatus.BAD_REQUEST, data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(code, message, data);
  }
}
