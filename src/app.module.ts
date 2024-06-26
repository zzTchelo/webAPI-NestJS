import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogoModule } from './controllers/catalogo/catalogo.module';
import { UsersModule } from './controllers/users/users.module';
import { AuthModule } from './controllers/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal : true }),
    CatalogoModule, UsersModule, AuthModule, DbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
