import { ApiProperty } from "@nestjs/swagger";

export class auth{
    token : string
    expiresIn : number
}