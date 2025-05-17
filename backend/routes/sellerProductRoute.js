import express from "express";
import {
    sellerHandler,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductsByCategory,
    getRecommendedProducts,
    toggleFeaturedProduct,
} from "../controllers/sellerController.js";
import { adminRoute, protectRoute,sellerRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/get-seller-products", protectRoute,sellerRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
// Only allow if user is authenticated and is an admin

// Only allow if user is authenticated and is a seller
router.post("/seller-action", sellerRoute, sellerHandler);
router.patch("/:id", protectRoute,sellerRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute,sellerRoute, deleteProduct);

export default router;
