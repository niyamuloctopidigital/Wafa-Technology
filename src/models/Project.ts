import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  thumbnail: string;
  images: string[];
  clientName?: string;
  projectUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    category: { type: String, required: true },
    technologies: [{ type: String }],
    thumbnail: { type: String, required: true },
    images: [{ type: String }],
    clientName: { type: String },
    projectUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

ProjectSchema.index({ category: 1 });
ProjectSchema.index({ isFeatured: 1, isActive: 1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
