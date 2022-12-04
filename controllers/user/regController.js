import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../../helpers/generateToken.js";

//@description  Register User
//@route        POST /api/users
//@access       public
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const isHaveUser = await User.findOne({ email: email });

  if (isHaveUser) {
    res.status(400);
    throw new Error("This user registered");
  }
  const user = await User.create({
    email,
    password,
    name: `user_${(Math.random() * 1000000).toFixed(0)}`,
  });
  const token = generateToken(user._id);

  res.json({ user, token });
});
