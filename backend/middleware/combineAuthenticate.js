import jwt from 'jsonwebtoken';
import Admin from '../models/user.model.js';

const secretKey = process.env.JWT_SECRET; // Ensure this environment variable is properly set

const combinedAuthenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken || !accessToken.startsWith('Bearer ')) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    let user;
    let decoded;

      console.log('Attempting to validate admin token...');
      decoded = jwt.verify(token, secretKey);
      user = await Admin.findOne({ userName: decoded.userName });
      if (user) {
        req.user = user;
        console.log('Admin token validated successfully, proceeding to next middleware');
        return next();
}
  }
    catch(error){
        console.log("error",error)
    }


}

export default combinedAuthenticate;