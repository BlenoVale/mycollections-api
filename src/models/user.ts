import mongoose from "mongoose";
mongoose.Promise = global.Promise;

interface IUser {
    name: String;
    email: String;
    passwordHash: String;
    token: String;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, require: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    token: { type: String, required: true }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;