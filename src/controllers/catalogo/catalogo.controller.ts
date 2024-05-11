import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FilmeRouteParameters, filme, findAllParameters } from 'src/controllers/catalogo/filme';
import { CatalogoService } from './catalogo.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Filmes')
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
    async findAll(@Query() params : findAllParameters) : Promise<filme[]>{
        return await this.catalogo.findAll(params);
    }

    @Put('/:id')
    async update(@Param() param : FilmeRouteParameters, @Body() filme : filme){
        await this.catalogo.update(param.id, filme)
    }

    @Delete('/:id')
    async delete(@Param('id') id : string){
        await this.catalogo.delete(id);
    }

}
