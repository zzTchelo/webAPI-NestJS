import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [JwtModule.registerAsync({
    global : true,
    imports : [],
    useFactory : async (ConfigService : ConfigService) => ({
      secret : ConfigService.get<string>('JWT_SECRET'),
      signOptions : {expiresIn : +ConfigService.get<number>('JWT_EXPIRATION')}
    }),
    inject : [ConfigService],
  }), UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
