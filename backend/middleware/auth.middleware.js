import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import util from "util"; // for better object logging

// Define where to look for tokens
const tokenResolvers = [
  req => req.cookies?.accessToken,
  req => req.cookies?.refreshToken,
  req => req.headers.authorization?.split(" ")[1], // Bearer <token>
  req => req.query.token
];

// Protect route: check all token locations until one is valid
export const protectRoute = async (req, res, next) => {
  let lastError;

  for (const resolveToken of tokenResolvers) {
    const token = resolveToken(req);
    if (!token) continue;

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        lastError = new Error("User not found");
        continue;
      }

      req.user = user;

      console.log("Authenticated user →", util.inspect(req.user, { depth: null, colors: true }));

      return next(); // success
    } catch (err) {
      lastError = err;
    }
  }

  const message =
    lastError?.name === "TokenExpiredError"
      ? "Unauthorized – Token expired"
      : "Unauthorized – Invalid or missing token";

  return res.status(401).json({ message });
};

// Admin route middleware
export const adminRoute = (req, res, next) => {
  console.log("Checking admin access →", util.inspect(req.user, { depth: null, colors: true }));

  if (req.user?.role === "admin") {
    return next();
  }

  return res.status(403).json({ message: "Access denied – Admin only" });
};

// Seller route middleware
export const sellerRoute = (req, res, next) => {
  console.log("Checking seller access →", util.inspect(req.user, { depth: null, colors: true }));

  if (req.user?.role === "seller") {
    return next();
  }

  return res.status(403).json({ message: "Access denied – Seller only" });
};
