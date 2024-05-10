import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { filme } from './filme';

@Injectable()
export class CatalogoService {

    private filmes : filme [] = []

    create(filme : filme){
        this.filmes.push(filme);
        throw new HttpException(`Filme adicionado com sucesso!`, HttpStatus.CREATED)
    }

    findById(id : number) : filme{
        const foundFilme = this.filmes.filter( filme => filme.id == id);

        if (foundFilme.length)
            return foundFilme[0]
        
        throw new HttpException(`ID:${id} not found!`, HttpStatus.NOT_FOUND);

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

    delete(id : number){
        let filmeExists = this.filmes.findIndex( filme => filme.id == id);
        
        if (filmeExists >= 0){
            this.filmes.splice(filmeExists, 1);
            throw new HttpException(`Filme removido com sucesso!`, HttpStatus.OK);
        }

        throw new HttpException(`Filme não encontrado.`, HttpStatus.NOT_FOUND);
    }

}
