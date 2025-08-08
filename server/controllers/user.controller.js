import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/veriyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";
// Register User Controller
export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Provide Email , Name, Password",
        error: true,
        success: false,
      });
    }
    const user = await userModel.findOne({ email });

    if (user) {
      return response.status(400).json({
        message: "Already Registered Email",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hasPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hasPassword,
    };

    const newuser = new userModel(payload);
    const save = await newuser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verificationEmail = await sendEmail({
      sendTo: email,
      subject: "Verify email from Blinkyt",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    console.log("Verification email response:", verificationEmail);

    return response.json({
      message: "User Register Successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Verify Email Controller
export async function verifyEmailController(request, response) {
  try {
    const { code } = request.body;

    const user = await userModel.findOne({ _id: code });

    if (!user) {
      return response.status(400).json({
        message: "Invalid Verification Code",
        error: true,
        success: false,
      });
    }

    const updateUser = await userModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return response.json({
      message: "Email Verified Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}

// Login Controller

export async function loginController(request, response) {
  try {
    const { email, password } = request.body;

    const user = await userModel.findOne({ email });

    if (!email || !password) {
      return response.status(400).json({
        message: "Provide Email and Password",
        error: true,
        success: false,
      });
    }

    if (!user) {
      return response.status(400).json({
        message: "Invalid Email or Password",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Your Account is not Active",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return response.status(400).json({
        message: "Invalid Password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const updatedUser = await userModel.findByIdAndUpdate(user._id,{
      last_login_date: new Date()
    })

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Logout Controller

export async function logoutController(request, response) {
  try {
    const userid = request.userId; // Get user ID from the request object, set by auth middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await userModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return response.json({
      message: "Logout Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Upload Avatar
export async function uploadAvatar(request, response) {
  try {
    const userId = request.userId; // Get user ID from the request object, set by auth middleware
    const image = request.file; // Assuming you're using multer for file uploads

    // console.log('Image : ', image);
    const upload = await uploadImageCloudinary(image);

    const updateUser = await userModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return response.json({
      message: "upload Profile",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// update User Profile

export async function updateUserProfile(request, response) {
  try {
    const userId = request.userId; // Get user ID from the request object, set by auth middleware
    const { name, mobile, password } = request.body;

    // if (!name || !email || !mobile || !password) {
    //   return response.status(400).json({
    //     message: "Provide Name, Email, Mobile and Password",
    //     error: true,
    //     success: false,
    //   });
    // }

    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      {
        ...(name && { name: name }),
        // ...(email && {email : email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: await bcryptjs.hash(password, 10) }),
      },
      { new: true } // Return the updated document
    );

    return response.json({
      message: "Profile Updated Successfully",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//  Forgot Password Controller
export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "User not found with this email",
        error: true,
        success: false,
      });
    }

    const otp = generateOtp();

    const expireTime = new Date(Date.now() + 60 * 60 * 1000);

    const update = await userModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Reset Password OTP from Blinkyt",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    return response.json({
      message: "Check Your Email for OTP",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// verify Forgot Password OTP Controller

export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;

    if (!email || !otp) {
      return response.status(400).json({
        message: "Provide Email and OTP",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "User not found with this email",
        error: true,
        success: false,
      });
    }

    // const currentTime = new Date().toISOString();
    // const otpExpiryTime = new Date(user.forgot_password_expiry).toISOString();

    if (new Date(user.forgot_password_expiry) < new Date()) {
      return response.status(400).json({
        message: "OTP has expired",
        error: true,
        success: false,
      });
    }

    if (user.forgot_password_otp !== otp) {
      return response.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    const updateUser = await userModel.findByIdAndUpdate(user?._id,{
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    // OTP is valid, proceed with password reset
    return response.json({
      message: "OTP is valid",
      error: false,
      success: true,
      data: {
        userId: user._id, // You can return the user ID for further processing
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Reset Password Controller

export async function resetPassword(request, response) {
  try {
    const { email, newPassword, confirmPassword } = request.body;
    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "Provide Email, New Password and Confirm Password",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "User not found with this email",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "New Password and Confirm Password do not match",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    const updateUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    return response.json({
      message: "Password reset successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Refresh Token Controller
export async function refreshTokenController(request, response) {
  try {

    const  refreshToken = request.cookies.refreshToken || request?.header?.authorization?.split(" ")[1] // Bearer Token
    if(!refreshToken){
      return response.status(400).json({
        message: "Refresh Token is required",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)

    if(!verifyToken){
      return response.status(400).json({
        message: "Invalid Refresh Token",
        error: true,
        success: false,
      });
    }
    console.log("Verify Token : ", verifyToken);
    
    const userId = verifyToken.userId;
    const newAccessToken = await generateAccessToken(userId)

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None", // frontend and backend are on different domains
    }

    response.cookie("accessToken", newAccessToken, cookiesOption)

    return response.json({
      message: "New Access Token Generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });

    // new Access Token is used to access protected routes
    

    console.log("Refresh Token : ", refreshToken);


  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


//get Login User Details p-2

export async function userDetails(request, response){
   try {
     const userId = request.userId; // Get user ID from the request object, set by auth middleware
 
     const user = await userModel.findById(userId).select('-password -refresh_token') 
     // Exclude sensitive fields like password and refresh_token
 
     return response.json({
       message: 'User Deails',
       data: user,
       error: false,
       success: true,
     });
   } catch (error) {
     return response.status(500).json({
       message: error.message || error,
       error: true,
       success: false,
     });
   }
}