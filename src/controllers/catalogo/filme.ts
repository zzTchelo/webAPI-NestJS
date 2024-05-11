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
    id : string;

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title : string;
    
    @IsEnum(GeneroFilme)
    gender : string;

    @IsDateString()
    dateRelease : string;
}