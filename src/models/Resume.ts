import mongoose from 'mongoose';

const SectionItemSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  date: String,
  description: String,
});

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String },
  experience: [SectionItemSchema],
  education: [SectionItemSchema],
  skills: [String],
  projects: [SectionItemSchema],
  theme: {
    type: String,
    default: 'classic',
  },
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
