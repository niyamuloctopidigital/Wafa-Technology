import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  isFeatured: boolean;
  readTime: number;
  views: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    metaTitle: { type: String },
    metaDescription: { type: String },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

BlogSchema.index({ isPublished: 1, publishedAt: -1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
