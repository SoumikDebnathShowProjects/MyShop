import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Register the model if it doesn't exist
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;