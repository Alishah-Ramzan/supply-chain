import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: 'dewkvhlje',
	api_key:'835292952964664',
	api_secret:'ZrkM_rttEvHWGc2lpjyAQVINSgw',
});

export default cloudinary;
