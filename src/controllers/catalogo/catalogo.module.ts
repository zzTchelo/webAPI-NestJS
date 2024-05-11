import { Module } from '@nestjs/common';
import { CatalogoController } from './catalogo.controller';
import { CatalogoService } from './catalogo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityFilme } from 'src/db/entities/filme.entity';

@Module({
    imports : [TypeOrmModule.forFeature([entityFilme])],
    controllers : [CatalogoController],
    providers : [CatalogoService]
})

export class CatalogoModule {}
