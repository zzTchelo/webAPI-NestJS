import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogoModule } from './controllers/catalogo/catalogo.module';

@Module({
  imports: [CatalogoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
