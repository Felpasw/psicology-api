import mongoose, { Document, Model } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default UserModel;
