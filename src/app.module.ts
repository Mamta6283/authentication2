import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UserSchema } from './auth/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Module({
  
  imports:[
    JwtModule.register({global:true ,secret:'123'})
    , MongooseModule.forRoot('mongodb://localhost:27017/authenticate'),
   AuthModule
  ],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


