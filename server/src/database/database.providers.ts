import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';


const defaultConnection = (configService: ConfigService): TypeOrmModuleOptions => {
	const isProduction = configService.get('NODE_ENV') === 'production';
	return {
		type: 'postgres',
		host: configService.get('DB_HOST'),
		port: configService.get('DB_PORT'),
		username: configService.get('DB_USERNAME'),
		password: configService.get('DB_PASSWORD'),
		database: configService.get<string>('DB_DATABASE'),
		autoLoadEntities: true,
		synchronize: !isProduction
	} as TypeOrmModuleOptions
};

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
     imports: [ConfigModule],
     inject: [ConfigService],
     useFactory: defaultConnection,
  }),
];