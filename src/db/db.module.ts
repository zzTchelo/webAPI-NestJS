import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports : [TypeOrmModule.forRootAsync({
        useFactory : async (configService : ConfigService) => ({
            type : 'postgres',
            url : configService.get<string>('DB_URL'),
            entities : [__dirname + '/entities/**'],
            migrations : [__dirname + '/migrations/*.ts'],
            synchronize : false
        }),
        inject : [ConfigService]
    })]
})
export class DbModule {}
