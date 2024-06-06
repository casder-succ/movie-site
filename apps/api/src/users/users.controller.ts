import { Body, Controller, Delete, Get, Param, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { User } from 'common/decorators/user.decorator';
import { MongooseIdValidationPipe } from 'common/pipes/mongoose-id.validation.pipe';

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

  @Auth('admin')
  @Get(':userId')
  async getUser(@Param('userId', new MongooseIdValidationPipe()) userId: string) {
    return this.usersService.getUser(userId);
  }
}
