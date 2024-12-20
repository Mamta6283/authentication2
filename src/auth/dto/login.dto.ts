import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    
@IsNotEmpty()
@IsString()
readonly name:string;

@IsEmail({},{message:"please enter correct email"})
readonly email:string


@IsNotEmpty()
@IsString()
readonly password:string;
}