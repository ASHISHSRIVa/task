import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No Token",
      });
    }

    const splitToken = token.split(" ")[1];

    const decoded = jwt.verify(
      splitToken,
      process.env.JWT_SECRET
    );

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;