import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: jwtConstants.secret,
        signOptions: {
          expiresIn: jwtConstants.expirationTime,
        },
      }),
    }),
  ],
  providers: [AuthService, AuthGuard, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, AuthGuard, RolesGuard],
})
export class AuthModule {}
