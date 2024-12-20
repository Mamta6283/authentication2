import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from 'src/guards/auth.guards';
// import { AuthGuard} from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  // @UseGuards(AuthGuard)
  // @UseGuards(AuthGuard())
  async signupUser(@Body() signUpDto: SignUpDto): Promise<{ token }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @UseGuards(AuthGuard)
  async Login(@Body() loginDto: LoginDto): Promise<{ token }> {
    return this.authService.login(loginDto);
  }

// @Post('refresh')
// async refreshTo=(@Body() refrehtokendto:RefreshTokenDto){
// }

}
