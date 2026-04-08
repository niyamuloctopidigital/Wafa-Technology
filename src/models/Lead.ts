import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    service: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'closed'],
      default: 'new',
    },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

LeadSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
