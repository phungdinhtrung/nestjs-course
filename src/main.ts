import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

let PORT = 3000

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({            // ValidationPipe: kiểm tra dữ liệu gửi lên server. Auto validate theo DTO rule trong entity (thường dùng cho khi insert và update)
			transform: true,            // Sử dụng để tự động chuyển query và params từ dạng string sang dạng đã định nghĩa trong entity (nên để)
			whitelist: true, 			// to remove invalid data object send to server: loại bỏ mã độc gửi lên server
			forbidNonWhitelisted: true  // to not allow to thực thi các mã độc insert và update vào database
		})
	);
    
	await app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

bootstrap();
