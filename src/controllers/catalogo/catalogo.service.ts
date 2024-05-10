import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { filme } from './filme';

@Injectable()
export class CatalogoService {

    private filmes : filme [] = []

    create(filme : filme){
        this.filmes.push(filme);
        console.log(this.filmes);
    }

    findById(id : number) : filme{
        const foundFilme = this.filmes.filter( filme => filme.id == id);

        if (foundFilme.length)
            return foundFilme[0]
        
        throw new HttpException(`ID:${id} not found!`, HttpStatus.NOT_FOUND);
        
    }
}
