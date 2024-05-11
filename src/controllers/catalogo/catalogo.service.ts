import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { filme, findAllParameters } from './filme';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
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
        });

        if (!foundFilme)
            throw new HttpException(`ID:${id} not found!`, HttpStatus.NOT_FOUND);
            
        return this.mapEntity(foundFilme);

    }

    async findAll(params : findAllParameters) : Promise<filme[]> {
        const searchParams : FindOptionsWhere<entityFilme> = {}

        if (params.title)
            searchParams.title = Like(`%${params.title}%`)

        if (params.gender)
            searchParams.gender = Like(`%${params.gender}%`)

        const filmesFound = await this.filmeRepository.find({
            where : searchParams
        });

        return filmesFound.map(entityFilme => this.mapEntity(entityFilme));
    }

    async update(id : string, filmeAtualizado : filme){
        const foundFilme = await this.filmeRepository.findOne({
            where : { id }
        })

        if (!foundFilme)
            throw new HttpException(`Formato de filme inválido ou filme não encontrado.`, HttpStatus.BAD_REQUEST);

        await this.filmeRepository.update(id, this.mapDatatoEntity(filmeAtualizado));
        
    }

    delete(id : string){

        throw new HttpException(`Filme não encontrado.`, HttpStatus.NOT_FOUND);
    }

    private mapEntity(filme : entityFilme) : filme {
        return {
            id : filme.id,
            title : filme.title,
            gender : filme.gender,
            dateRelease : filme.dateRelease
        }
    }

    private mapDatatoEntity(filme : filme) : Partial<entityFilme>{
        return {
            title : filme.title,
            gender : filme.gender,
            dateRelease : filme.dateRelease
        }
    }
}
