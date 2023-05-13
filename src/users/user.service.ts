import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FilesService } from '../files/files.service';
import { GeneratePdfDto } from './dto/generate-pdf.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    protected userRepository: UserRepository,
    protected filesService: FilesService,
    protected jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<boolean> {
    const userEntity = {
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      image: null,
      pdf: null,
    };
    await this.userRepository.create(userEntity);
    return true;
  }

  async findAllUsers() {
    console.log(process.env);
    return this.userRepository.findAll();
  }

  async findUser(id: string): Promise<User | boolean> {
    const result: User = await this.userRepository.findOne(id);
    if (!result) return false;
    return result;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    const result: UpdateResult = await this.userRepository.updateUser(
      id,
      updateUserDto,
    );
    return result.affected !== 0;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result: DeleteResult = await this.userRepository.delete(id);
    return result.affected !== 0;
  }

  async uploadImage(id: string, image: any): Promise<boolean> {
    const imageName = await this.filesService.createImage(image);
    const result: UpdateResult = await this.userRepository.insertImage(
      id,
      imageName,
    );
    return result.affected !== 0;
  }

  async generatePDF(generatePDFDto: GeneratePdfDto) {
    const user = await this.userRepository.findUserByEmail(
      generatePDFDto.email,
    );
    if (!user) return false;
    const pdf = await this.filesService.generatePDF(user);
    await this.userRepository.insertPdf(user.id, pdf);
    return true;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findUserByEmail(loginUserDto.email);
    if (!user) return false;
    const accessToken = this.jwtService.sign(
      { email: user.email },
      {
        secret: process.env.JWT_SECRET || 'super_secret',
      },
    );
    return { accessToken: accessToken };
  }
}
