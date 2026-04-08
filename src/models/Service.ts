import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceFeature {
  title: string;
  description: string;
  icon: string;
}

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: IServiceFeature[];
  technologies: string[];
  thumbnail: string;
  bannerImage: string;
  metaTitle: string;
  metaDescription: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceFeatureSchema = new Schema<IServiceFeature>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
});

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    icon: { type: String, required: true },
    features: [ServiceFeatureSchema],
    technologies: [{ type: String }],
    thumbnail: { type: String },
    bannerImage: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ServiceSchema.index({ isActive: 1, order: 1 });

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
