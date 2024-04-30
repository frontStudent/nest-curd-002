import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('update')
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (id) {
      return this.userService.update(+id, updateUserDto);
    }
    throw new InternalServerErrorException({
      message: '更新用户信息需传用户ID',
    });
  }

  @Post('delete')
  remove(@Body('id') id: string) {
    if (id) {
      return this.userService.remove(+id);
    }
    throw new InternalServerErrorException({
      message: '删除用户信息需传用户ID',
    });
  }

  @Post('query')
  findAll(@Body('id') id: string) {
    if (id) {
      return this.userService.findOne(+id);
    }
    return this.userService.findAll();
  }
}
