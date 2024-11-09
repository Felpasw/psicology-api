import mongoose, { Document, Model } from 'mongoose';

// Interface para o documento da agenda
interface ISchedule extends Document {
  title: string;
  description?: string;
  date: Date;
  startTime: string;  
  endTime?: string;   
  location?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdBy: mongoose.Schema.Types.ObjectId;  
  createdAt?: Date;
  updatedAt?: Date;
}

const scheduleSchema = new mongoose.Schema<ISchedule>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const ScheduleModel: Model<ISchedule> = mongoose.model<ISchedule>('Schedule', scheduleSchema);
export default ScheduleModel;
