import { Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";

@Schema({
    timestamps:true
})
export class User{
    @Prop({required:true})
    name:string

    @Prop({required:true})
    email:string

    @Prop({ required: true, type: String }) // Ensure the type is String
    password: string;
}
export const UserSchema=SchemaFactory.createForClass(User)