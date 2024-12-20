import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from './schemas/user.schema';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schema';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule], //important to import for working properly configService
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return{
          secret:config.get<string>('jwt_secret','123'),
          signOptions:
          {
            // expiresIn:config.get<string | number>('jwt_expire'),
            expiresIn:'3d'
          },
        };
      },
    }),
    MongooseModule.forFeature([
      {name:'User',schema:UserSchema},
      {
        name:RefreshToken.name,
        schema:RefreshTokenSchema
      },
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}


//this is auth module