import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { filme } from 'src/controllers/catalogo/filme';
import { CatalogoService } from './catalogo.service';

@Controller('catalogo')
export class CatalogoController {

    constructor(
        private readonly catalogo : CatalogoService
    ){}

    @Post()
    create(@Body() filme : filme){
        this.catalogo.create(filme);
    }

    @Get('/:id')
    findByID(@Param('id') id : number){
        return this.catalogo.findById(id);
    }

}
