import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(CreateUserDto: CreateUserDto) {
    return await this.userRepository.save({
      ...CreateUserDto,
      photos: [],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const qb = await this.userRepository.createQueryBuilder();
    return await qb.update().set(updateUserDto).where({ id }).execute();
  }

  async findAll() {
    // 若不设置relations: ['photos']则查出来的user没有photos属性
    return await this.userRepository.find({ relations: ['photos'] });
  }

  async findOne(id: number) {
    // const sql = `select * from user where id = ${id}`;
    // return await this.userRepository.query(sql);
    return await this.userRepository.find({
      where: { id },
      relations: ['photos'],
    });
  }

  async remove(id: number) {
    const qb = await this.userRepository.createQueryBuilder();
    return await qb.delete().where({ id }).execute();
  }
}
