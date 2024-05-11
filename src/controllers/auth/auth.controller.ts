import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { auth } from './auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService : AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Body('username') username : string,
        @Body('password') password : string
    ) : Promise<auth> {
        return await this.authService.login(username, password);
    }

}
