import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

// nest generate module auth nest generate controller auth nest generate service auth
// npm i @nestjs/jwt bcryptjs модуль для работы с jwt токеном и шифрования паролей

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    // UsersModule
    forwardRef(() => UsersModule),
    JwtModule.register({ // импортируем JwtModule и сразу устанавливаем секретный ключ
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService, // что бы AuthModule можно было переиспользовать где угодно
    JwtModule
  ]
})
export class AuthModule {}
