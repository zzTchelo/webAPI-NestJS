import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { user } from './users';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        private readonly userService : UsersService
    ){}

    @Post()
    create(@Body() user : user){
        this.userService.create(user);
    }

}
