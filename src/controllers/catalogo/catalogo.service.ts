import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { filme } from './filme';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { entityFilme } from 'src/db/entities/filme.entity';

@Injectable()
export class CatalogoService {

    constructor(
        @InjectRepository(entityFilme)
        private readonly filmeRepository : Repository<entityFilme>
    ) {}

    async create(filme : filme){
        const filmeToSave : entityFilme = {
            title : filme.title,
            gender : filme.gender,
            dateRelease : filme.dateRelease
        }

        const createFilme = await this.filmeRepository.save(filmeToSave);

        return this.mapEntity(createFilme);

    }

    async findById(id : string) : Promise<filme> {
        const foundFilme = await this.filmeRepository.findOne({
            where : { id }
        })

        if (!foundFilme)
            throw new HttpException(`ID:${id} not found!`, HttpStatus.NOT_FOUND);
            
        return this.mapEntity(foundFilme)

    }

    findAll(){
        return this.filmes;
    }

    update(filmeAtualizado : filme){

        let filmeExists = this.filmes.findIndex( filme => filme.id == filmeAtualizado.id);

        if (filmeExists >= 0){
            this.filmes[filmeExists] = filmeAtualizado
            throw new HttpException(`Filme atualizado com sucesso!`, HttpStatus.OK);
        }

        throw new HttpException(`Formato de filme inválido ou filme não encontrado.`, HttpStatus.BAD_REQUEST);
        
    }

    delete(id : string){
        let filmeExists = this.filmes.findIndex( filme => filme.id == id);
        
        if (filmeExists >= 0){
            this.filmes.splice(filmeExists, 1);
            throw new HttpException(`Filme removido com sucesso!`, HttpStatus.OK);
        }

        throw new HttpException(`Filme não encontrado.`, HttpStatus.NOT_FOUND);
    }

    private mapEntity(Filme : entityFilme) : filme {
        return {
            id : Filme.id,
            title : Filme.title,
            gender : Filme.gender,
            dateRelease : Filme.dateRelease
        }
    }
}
