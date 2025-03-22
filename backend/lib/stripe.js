import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

export const stripe = new Stripe('sk_test_51R5MXY2as88qfghitqQHUBYL0TDnUaLx8mjzR29WGSexwOQAKEhXjTcgfE7vIITvcCMC8rC9tnGzDMr0VlXZT0Zn00jZSFWfJq');
