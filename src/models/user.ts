import mongoose, { Schema, Document } from 'mongoose';
import { RefreshTokenInterface } from './refreshToken';

export interface UserInterface extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserLoggedInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<UserInterface>('user', UserSchema);
