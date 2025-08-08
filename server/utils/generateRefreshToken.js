import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
const generateRefreshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    {
      expiresIn: "7d", // Token will expire in 7 days
    }
  );

  const updateRefreshToken = await userModel.updateOne(
    {
      _id: userId,
    },
    {
      refresh_token: token,
    }
  );
  return token;
};

export default generateRefreshToken;
