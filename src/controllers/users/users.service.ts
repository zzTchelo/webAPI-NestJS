import { ConflictException, Injectable } from '@nestjs/common';
import { user } from './users';
import { v4 as uuid } from 'uuid';
import { hashSync as bcrypt } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { entityUser } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(entityUser)
        private readonly usersRepository : Repository<entityUser>
    ){}

    async create(newUser : user){
        const alreadyExists = await this.findByUsername(newUser.username);

        if (alreadyExists)
            throw new ConflictException();

        const dbUser = new entityUser();
        dbUser.username = newUser.username;
        dbUser.passwordHash = bcrypt(newUser.password, 10);

        const {id, username} = await this.usersRepository.save(dbUser);

        return {id, username};
        
    }

    async findByUsername (username : string) : Promise<user | null> {
        const userFound = await this.usersRepository.findOne({
            where : { username }
        })

        if (!userFound)
            null;

        return {
            id : userFound.id,
            username : userFound.username,
            password : userFound.passwordHash
        }
    }
}
