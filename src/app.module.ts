import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogoModule } from './controllers/catalogo/catalogo.module';
import { UsersModule } from './controllers/users/users.module';

@Module({
  imports: [CatalogoModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
