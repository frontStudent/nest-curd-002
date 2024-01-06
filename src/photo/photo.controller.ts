import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('addPhoto')
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Post('updatePhoto')
  //post请求不能用@Param用@Body
  update(@Body('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    if (id) {
      return this.photoService.update(+id, updatePhotoDto);
    }
    throw new InternalServerErrorException({
      message: '更新用户信息需传用户ID',
    });
  }

  @Post('deletePhoto')
  remove(@Body('id') id: string) {
    if (id) {
      return this.photoService.remove(+id);
    }
    throw new InternalServerErrorException({
      message: '删除用户信息需传用户ID',
    });
  }

  @Post('queryPhoto')
  findAll(@Body('id') id: string) {
    if (id) {
      return this.photoService.findOne(+id);
    }
    return this.photoService.findAll();
  }
}
