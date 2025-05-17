import express from "express";
import {
	adminHandler,
	sellerHandler,
	deleteProduct,
	getAdminProducts,
	getSellerProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute,sellerRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/admin-get-product",protectRoute, adminRoute,  getAdminProducts);
router.get("/seller-get-product", protectRoute, sellerRoute , getSellerProducts);


router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
// Only allow if user is authenticated and is an admin
router.post("/admin-action", protectRoute, adminRoute, adminHandler);

// Only allow if user is authenticated and is a seller
router.post("/seller-action", protectRoute, sellerRoute, sellerHandler);
router.patch("/:id", protectRoute, adminRoute,sellerRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute,sellerRoute, deleteProduct);

export default router;
