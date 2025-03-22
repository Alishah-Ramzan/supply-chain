import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(`rediss://default:AUotAAIjcDEwODBjOTNlZWY2YTg0YWRjOTZlODJkYjJlNmVlZWRjNXAxMA@ace-rhino-18989.upstash.io:6379`);
