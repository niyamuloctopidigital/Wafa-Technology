import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  department?: string;
  isLeader: boolean;
  linkedin?: string;
  twitter?: string;
  github?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String },
    department: { type: String },
    isLeader: { type: Boolean, default: false },
    linkedin: { type: String },
    twitter: { type: String },
    github: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
