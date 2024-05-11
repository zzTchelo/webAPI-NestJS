import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { entityFilme } from "./entities/filme.entity";
import { entityUser } from "./entities/user.entity";

config();

const configService = new ConfigService();

const dataSourceOptions : DataSourceOptions = {
    type : 'postgres',
    url : configService.get<string>('DB_URL'),
    entities : [entityFilme, entityUser],
    migrations : [__dirname + '/migrations/*.ts'],
    synchronize : false    
}

export default new DataSource(dataSourceOptions);