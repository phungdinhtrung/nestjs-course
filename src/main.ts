import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,            // config to auto transform path params and query params to be type valid param in service
			whitelist: true, 			// config to remove invalid data object send to server then do action (ex: insert valid data to db)
			forbidNonWhitelisted: true  // config to not allow to do action (ex: insert invalid data to db) and then message to user
		})
	);
	await app.listen(3000);
}
bootstrap();
