import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  NotFoundException,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GeneratePdfDto } from './dto/generate-pdf.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from '../security/jwt.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findUser(@Param('id') id: string) {
    const result = await this.userService.findUser(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.updateUser(id, updateUserDto);
    if (!result) throw new NotFoundException();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const result = await this.userService.deleteUser(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('pdf')
  async generatePDF(
    @Body() generatePDFDto: GeneratePdfDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.generatePDF(generatePDFDto);
    if (!result) throw new NotFoundException();
    res.status(HttpStatus.CREATED).json(true);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@Param('id') id: string, @UploadedFile() image) {
    return this.userService.uploadImage(id, image);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.userService.loginUser(loginUserDto);
    if (!result) throw new UnauthorizedException();
    return result;
  }
}
