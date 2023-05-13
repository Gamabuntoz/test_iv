import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>, // @InjectDataSource() protected dataSource: DataSource
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.insert(createUserDto);
  }

  async findAll() {
    return this.userModel.find({});
  }

  async findOne(id: string) {
    return this.userModel.findOne({ where: { id: id } });
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email: email } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.update(
      { id: id },
      {
        email: updateUserDto.email,
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
      },
    );
  }

  async insertImage(id: string, imageName: string) {
    return this.userModel.update(
      { id: id },
      {
        image: imageName,
      },
    );
  }

  async insertPdf(id: string, pdf: string) {
    return this.userModel.update(
      { id: id },
      {
        pdf: pdf,
      },
    );
  }

  async delete(id: string) {
    return this.userModel.delete({ id: id });
  }
}
