import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private JwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ token: string; refreshToken: string }> {
    const { name, email, password } = signUpDto;

    //check if the user already exists
    // const existiguser = await this.userModel.findOne({ email });
    // if (existiguser) {
    //   throw new UnprocessableEntityException('user already exist');
    // }

    //hash the spassword
    const hashedPassword = await bcrypt.hash(password, 10);

    //create the user
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    //access token
    const token = this.JwtService.sign({ id: user._id });
    const refreshToken = uuidv4();
   return { token, refreshToken };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; refreshToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('invalid eamil or password');
    }

    const token = this.JwtService.sign({ id: user._id });
    const refreshToken = uuidv4(); //this will generate the unique id
   
    return { token, refreshToken };
  }

 
}
