import mongoose from "mongoose";
import bcrypt from 'bcrypt'

//Vår table för user
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true, unique: false}
});

//Hasha vårt lösenord
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}


export const User = mongoose.model('User', UserSchema);