import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { auth } from './auth';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService : AuthService
    ){}

    @ApiBody({ 
        description: 'Credenciais de autenticação do usuário.',
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'example_user'
                },
                password: {
                    type: 'string',
                    example: 'example_password'
                }
            }
        }
    })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Autenticação bem-sucedida. Retorna um token de acesso.',
        schema: {
            example: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                expiresIn: '3600' // Tempo de expiração em segundos
            }
        }
    })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Credenciais inválidas.' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Body('username') username : string,
        @Body('password') password : string
    ) : Promise<auth> {
        return await this.authService.login(username, password);
    }

}
