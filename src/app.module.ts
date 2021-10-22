import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { CustomersModule } from './customers/customers.module';
import { PurchaseModule } from './purchases/purchases.module';
import { BouquetModule } from 'src/bouquets/bouquets.module';
import { SellersModule } from 'src/sellers/sellers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		GraphQLModule.forRoot({
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class',
				emitTypenameField: true,
			},
		}),
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'app.db',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
			autoLoadEntities: true,
		}),
		CustomersModule,
		PurchaseModule,
		BouquetModule,
		SellersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
