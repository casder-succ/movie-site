import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from 'common/decorators/user.decorator';
import { MongooseIdValidationPipe } from 'common/pipes/mongoose-id.validation.pipe';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Put('profile')
  @Auth()
  updateProfile(
  @User('_id') userId: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(userId, updateDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':userId')
  @Auth('admin')
  updateUser(
  @Param('userId', new MongooseIdValidationPipe()) userId: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(userId, updateDto);
  }

  @Auth('admin')
  @Delete(':userId')
  deleteUser(@Param('userId', new MongooseIdValidationPipe()) userId: string) {
    return this.usersService.delete(userId);
  }

  @Auth('admin')
  @Get('count')
  async getUsersCount() {
    return this.usersService.getCount();
  }

  @Auth('admin')
  @Get('')
  async listUsers(@Query('query') search?: string) {
    return this.usersService.list(search);
  }

  @Auth()
  @Get('favourites')
  async getFavourites(@User('_id') userId: string) {
    return this.usersService.getFavourites(userId);
  }

  @Auth('admin')
  @Get(':userId')
  async getUser(@Param('userId', new MongooseIdValidationPipe()) userId: string) {
    return this.usersService.getUser(userId);
  }

  @Auth()
  @Post('favourites')
  async addFavourite(
  @User('_id') userId: string,
    @Body('movieId', new MongooseIdValidationPipe()) movieId: Types.ObjectId,
  ) {
    return this.usersService.addFavourite(userId, movieId);
  }

  @Auth()
  @Delete('favourites/:movieId')
  async removeFavourite(
  @User('_id') userId: string,
    @Param('movieId', new MongooseIdValidationPipe()) movieId: Types.ObjectId,
  ) {
    return this.usersService.removeFavourite(userId, movieId);
  }
}
