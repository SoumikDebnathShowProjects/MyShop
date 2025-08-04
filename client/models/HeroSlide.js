import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema({
  image: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  subtitle: { 
    type: String 
  },
  cta: { 
    type: String, 
    default: "Shop Now" 
  },
  order: { 
    type: Number, 
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  homepage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homepage'
  }
}, { timestamps: true });

// Check if model exists before creating it
const HeroSlide = mongoose.models.HeroSlide || mongoose.model('HeroSlide', heroSlideSchema);

export default HeroSlide;