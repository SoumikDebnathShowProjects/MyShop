import express from 'express';
import {addHeroSlide, deleteHeroSlide, getHomepageConfig, manageFeaturedCategories, manageHeroSlides, updateHeroSlide} from '../controllers/HomePageControler.js'

import upload from '../utils/multer.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get homepage configuration
router.get('/', getHomepageConfig);

// Hero slides management
router.put('/hero-slides',manageHeroSlides);
router.post('/hero-slides',addHeroSlide);
router.put('/hero-slides/:id',upload.single('image'), updateHeroSlide);
router.delete('/hero-slides/:id',deleteHeroSlide);

// Featured categories management
router.put('/featured-categories', manageFeaturedCategories);

export default router;