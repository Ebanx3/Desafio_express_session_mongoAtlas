import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

export const UserCollectionName = 'user';

const UserSchema = new Schema({
        email: { type: String, required: true , unique:true},
        password: { type: String, required: true },
        admin: {type:Boolean, default:false}
    }, {
    versionKey: false,
}
)

UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    this.password = hash;
    next();
})

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

export const UserModel = model(UserCollectionName, UserSchema);
