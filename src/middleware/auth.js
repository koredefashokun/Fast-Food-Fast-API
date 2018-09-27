import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    res.status(400).json({
      success: false,
      message: 'No token provided!'
    });
  }
  let realToken = await token.replace('Bearer ', '');
  if (realToken) {
    const decoded = await jwt.verify(realToken, process.env.SECRET);
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token supplied!'
      });
    } else {
      req.decoded = decoded;
      next();
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'No token provided!'
    });
  }
}
export default auth;