import mongoose, { Document, Model } from 'mongoose';

interface IPatient extends Document {
  name: string;
  CPF: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  phoneNumber?: string;
  email?: string;
  address?: string;
  medicalHistory?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const patientSchema = new mongoose.Schema<IPatient>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    CPF: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['M', 'F', 'O'],
      required: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    address: {
      type: String,
      trim: true,
    },
    medicalHistory: {
      type: String,
    },
    profileImage: {
      type: String,
    },

    deletedAt: {
      type: Date,
      default: null,
    },


  },
  {
    timestamps: true,
  }
);

const PatientModel: Model<IPatient> = mongoose.model<IPatient>('Patient', patientSchema);
export default PatientModel;
