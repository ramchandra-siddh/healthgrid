import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpayInstance from "../config/razorpay.js";
import sendMail from "../config/mailer.js";

async function sendVerificationCode(user) {
  // generate new code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = code;
  user.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  await sendMail({
    to: user.email,
    subject: "Resend Verification Code - Verify your account",
    html: `Your new Code is <b>${code}</b>. It expires in 10 minutes.`,
  });
}

//API to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    //validating password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    //check if user exists
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    //using strong password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //generate Code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const userData = {
      name,
      email,
      password: hashedPassword,
      verificationCode: code,
      verificationCodeExpires: Date.now() + 10 * 60 * 1000,
    };

    const user = new userModel(userData);
    await user.save();

    sendMail({
      to: email,
      subject: "Verify your account",
      html: `<p>Your Verification Code is <b>${code}</b>. It expires in 10 minutes.</p>`,
    });

    res.json({
      success: true,
      message:
        "User registered! Please check your email for the verification code.",
    });

    // try {
    //   await sendMail({
    //     to: email,
    //     subject: "Verify your account",
    //     html: `<p>Your Verification Code is <b>${code}</b>. It expires in 10 minutes.</p>`,
    //   });

    //   res.json({
    //     success: true,
    //     message:
    //       "User registered! Please check your email for the verification code.",
    //   });
    // } catch (err) {
    //   console.error("Email send error:", err);
    //   res.json({
    //     success: false,
    //     message:
    //       "User registered but failed to send email. Try resending verification code.",
    //   });
    // }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//verify user
const verifyUser = async (req, res) => {
  try {
    const { email, verificationCode, fromLogin } = req.body;
    if (!email || !verificationCode) {
      return res.json({ success: false, message: "Email and OTP required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.isVerified)
      return res.json({ success: false, message: "Already verified" });

    if (
      user.verificationCode !== verificationCode ||
      user.verificationCodeExpires < Date.now()
    ) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    if (fromLogin) {
      //Case:user came form login JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({
        success: true,
        message: "Email verified. Logged in successfully.",
        token,
      });
    } else {
      // ✅ Case: user came from register → no JWT
      return res.json({
        success: true,
        message: "Email verified successfully. Please login now.",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//resend verification code
const resendVerifyCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email required" });
    }

    // find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // already verified
    if (user.isVerified) {
      return res.json({ success: false, message: "User already verified" });
    }

    await sendVerificationCode(user);
    res.json({
      success: true,
      message: "Verification Code resent successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid email or password" });

    if (!user.isVerified) {
      await sendVerificationCode(user);

      return res.json({
        success: false,
        message: "Email not verified. Verification code sent to email.",
      });
    }
    // if verified and password correct → login
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ success: true, message: "Logged in successfully.", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    /* 
      const {userId} = req.userId;
      const userData = await userModel.findById(userId).select("-password"); */

    // const userId  = req.body;
    const userData = await userModel.findById(req.userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // get user ID from middleware, NOT from req.body
    const { name, phone, address, dob, gender } = req.body;

    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    const finalAddress =
      typeof address === "string" ? JSON.parse(address) : address;

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: finalAddress,
      dob,
      gender,
    });

    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;
    //checking for slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user appointments for frontend my appointments page

const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentData, {
      cancelled: true,
    });

    //releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to make payment of appointmet using razorpay

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }
    //creating options for razorpay payments
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    //creation of an order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo);
    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  verifyUser,
  resendVerifyCode,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
