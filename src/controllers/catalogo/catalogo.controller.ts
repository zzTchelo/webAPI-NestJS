import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { filme } from 'src/controllers/catalogo/filme';
import { CatalogoService } from './catalogo.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
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
    findByID(@Param('id') id : string){
        return this.catalogo.findById(id);
    }

    @Get('')
    findAll(){
        return this.catalogo.findAll();
    }

    @Put('')
    update(@Body() filme : filme){
        this.catalogo.update(filme)
    }

    @Delete('/:id')
    delete(@Param('id') id : string){
        this.catalogo.delete(id);
    }

}
