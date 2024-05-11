import { ApiProperty } from "@nestjs/swagger";

export class auth{
    token : string
    expiresIn : number
}

export class user {
    id : string;
    @ApiProperty({
        description: 'Username para realizar o Login.'
    })
    username : string;
    @ApiProperty({
        description: 'Senha do usuário cadastrado.'
    })
    password : string;
}