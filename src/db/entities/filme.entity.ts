import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'filmes'})
export class entityFilme {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({type : 'varchar'})
    title : string;
    
    @Column({type : 'varchar'})
    gender : string;

    @Column({type : 'timestamptz', name : 'date_release'})
    dateRelease : string;
}