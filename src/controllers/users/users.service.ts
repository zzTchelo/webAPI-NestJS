import { Injectable } from '@nestjs/common';
import { user } from './users';
import { v4 as uuid } from 'uuid';
import { hashSync as bcrypt } from 'bcrypt';

@Injectable()
export class UsersService {

    private readonly users : user[] = []

    create(newUser : user){
        newUser.id = uuid();
        newUser.password = bcrypt(newUser.password, 10);
        this.users.push(newUser);
    }

    findByUsername (username : string) : user | null {
        return this.users.find(user => user.username = username);
    }
}
