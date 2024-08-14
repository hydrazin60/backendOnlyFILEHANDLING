import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("isAuthenticated error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export default isAuthenticated;
