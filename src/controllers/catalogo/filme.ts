import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export enum GeneroFilme {
    Acao = "Ação",
    Comedia = "Comédia",
    Drama = "Drama",
    Terror = "Terror",
    Romance = "Romance",
    FiccaoCientifica = "Ficção Científica",
    Suspense = "Suspense",
    Animacao = "Animação",
    Aventura = "Aventura",
    Crime = "Crime",
    Documentario = "Documentário",
    Fantasia = "Fantasia",
    Musical = "Musical",
    Misterio = "Mistério",
    Guerra = "Guerra",
    Faroeste = "Faroeste",
    Superheroi = "Super-herói",
    Biografia = "Biografia",
    Esporte = "Esporte",
    Familia = "Família"
}

export class filme{
    @IsUUID()
    @IsOptional()
    @ApiProperty({
        description : 'O Id do filme (gerado automáticamente).'
    })
    id : string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    @ApiProperty({
        description: 'Título do Filme.',
        example: 'Vingadores: Ultimato'
    })
    title : string;
    
    @IsEnum(GeneroFilme)
    @ApiProperty({
        description: 'Gênero do filme.',
        example: 'Ação',
        enum: GeneroFilme 
    })
    gender : string;

    @IsDateString()
    @ApiProperty({
        description: 'Data de lançamento do filme.',
        example: '2019-04-25'
    })
    dateRelease : string;
}

export class findAllParameters{
    title : string;
    gender : string;
}

export class FilmeRouteParameters{
    @IsUUID()
    id : string
}