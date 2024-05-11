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
    async create(@Body() filme : filme) : Promise<filme>{
        return await this.catalogo.create(filme);
    }

    @Get('/:id')
    async findByID(@Param('id') id : string ) : Promise<filme>{
        return await this.catalogo.findById(id);
    }

    @Get('')
    async findAll(){
        return await this.catalogo.findAll();
    }

    @Put('')
    async update(@Body() filme : filme){
        await this.catalogo.update(filme)
    }

    @Delete('/:id')
    async delete(@Param('id') id : string){
        await this.catalogo.delete(id);
    }

}
