import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose ,{Document} from "mongoose";

@Schema({versionKey:false,timestamps:true})
export class RefreshToken extends Document{

    @Prop({required:true})
    token :string

    @Prop({required:true, type:String})
    refreshToken:string

    @Prop({required:true,type:mongoose.Types.ObjectId})
    userId:mongoose.Types.ObjectId

    @Prop({required:true})
    expiryDate:Date //this the way longer than the access token

}
export const RefreshTokenSchema=SchemaFactory.createForClass(RefreshToken)


