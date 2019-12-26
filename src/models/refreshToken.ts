import mongoose, { Schema, Document } from 'mongoose';

export interface RefreshTokenInterface extends Document {
  token: string;
  email: string;
}

const RefreshToken: Schema = new Schema({
  token: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<RefreshTokenInterface>('refreshToken', RefreshToken);
