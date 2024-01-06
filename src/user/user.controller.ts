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

  @Post('addUserWithPhotos')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('updateUserWithPhotos')
  //post请求不能用@Param用@Body
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (id) {
      return this.userService.update(+id, updateUserDto);
    }
    throw new InternalServerErrorException({
      message: '更新用户信息需传用户ID',
    });
  }

  @Post('deleteUserWithPhotos')
  remove(@Body('id') id: string) {
    if (id) {
      return this.userService.remove(+id);
    }
    throw new InternalServerErrorException({
      message: '删除用户信息需传用户ID',
    });
  }

  @Post('queryUserWithPhotos')
  findAll(@Body('id') id: string) {
    if (id) {
      return this.userService.findOne(+id);
    }
    return this.userService.findAll();
  }
}
