import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'libs/entities/src/user.entity';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from '../../libs/types/response.entity';
import { CustomApiOkResponse } from 'libs/types/custom-api-ok-response';

@ApiTags('User')
@Controller('user')
@ApiExtraModels(User)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'get all users',
  })
  @CustomApiOkResponse(User, true)
  @Get()
  async getAllUsers(): Promise<ResponseEntity<User[]>> {
    return ResponseEntity.OK_WITH(await this.userService.findAll());
  }
}
