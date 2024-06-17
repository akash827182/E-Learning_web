import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Alredy Exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    user = {
      name,
      email,
      password: hashPassword,
    };
    const otp = Math.floor(Math.random() * 1000000);

    const activatinToken = jwt.sign(
      {
        user,
        otp,
      },
      process.env.Activation_Secret,
      { expiresIn: "1h" }
    );

    const data = {
      name,
      otp,
    };
    await sendMail(email, "E Learning", data);

    res.status(200).json({
      message: "OTP send to your mail",
      activatinToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
