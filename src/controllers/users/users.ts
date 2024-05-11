import { ApiProperty } from "@nestjs/swagger";

export class user {
    @ApiProperty({
        description: 'O Id do usuário que será cadastrado.'
    })
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