import { Injectable, UnauthorizedException } from '@nestjs/common';
import { auth } from './auth';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    private jwtExpirationSeconds : number;

    constructor(
        private readonly userService : UsersService,
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService
    ) {
        this.jwtExpirationSeconds = +this.configService.get<number>('JWT_EXPIRATION');
    }

    login(username : string, password : string) : auth{
        
        const foundUser = this.userService.findByUsername(username);

        if (!foundUser || !compareSync(password, foundUser.password))    
            throw new UnauthorizedException();

        const payload = { 
            sub : foundUser.id, 
            username : foundUser.username 
        }

        const token = this.jwtService.sign(payload);

        return {
            token,
            expiresIn : this.jwtExpirationSeconds
        }
    }

}
