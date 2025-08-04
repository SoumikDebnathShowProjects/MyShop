import mongoose from 'mongoose';

const featuredCategorySchema = new mongoose.Schema({
  category: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Fixed typo from 'ategory' to 'Category'
    required: true 
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  homepage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homepage'
  }
}, { timestamps: true });

// Check if model exists before creating it
const FeaturedCategory = mongoose.models.FeaturedCategory || mongoose.model('FeaturedCategory', featuredCategorySchema);

export default FeaturedCategory;