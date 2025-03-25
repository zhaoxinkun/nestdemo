import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  find() {
    return this.userService.find();
  }

  @Post()
  create(@Body() user: any) {
    return this.userService.create(user);
  }
}
