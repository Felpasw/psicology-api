import { config } from 'dotenv';
import mongoose from 'mongoose';

config();


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${process.env.DATA_BASE_USER}:${process.env.DATA_BASE_PASSWORD}@cluster0.fovabzu.mongodb.net/psicology?retryWrites=true&w=majority`).
  then(() => console.log("Conected to mongoDB!"));