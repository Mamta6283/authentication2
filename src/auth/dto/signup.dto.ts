import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto{
    
@IsNotEmpty()
@IsString()
 name:string;

@IsEmail({},{message:"please enter correct email"})
 email:string


@IsNotEmpty()
@IsString()
 password:string;
}