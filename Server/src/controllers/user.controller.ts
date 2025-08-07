import { User, type IUser } from "../models/users.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import type { CookieOptions, Request, RequestHandler, Response } from "express";
import { ENV } from "../config/env.js";
import type { UserDocument } from "../models/users.model.js";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

const generateAccessAndRefreshTokens = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    let { name, email, password } = req.body;

    name = name?.trim();
    email = email?.trim();
    password = password?.trim();

    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const existingUser = (await User.findOne({ email })) as UserDocument;
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    const user = await User.create({ name, email, password });
    if (!user || !user._id) {
      throw new ApiError(500, "Failed to register user");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id.toString()
    );

    const userObj = user.toObject() as Partial<IUser>;
    delete userObj.password;
    delete userObj.refreshToken;

    res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          201,
          { user: userObj, accessToken },
          "User registered successfully"
        )
      );
  }
);

const loginUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    let { email, password } = req.body;

    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
      throw new ApiError(409, "All fields are required");
    }

    const user = (await User.findOne({ email })) as UserDocument;
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Password is incorrect");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id.toString()
    );

    const userObj = user.toObject() as Partial<IUser>;
    delete userObj.password;
    delete userObj.refreshToken;

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          {
            user: userObj,
            accessToken,
          },
          "Login successfull"
        )
      );
  }
);

const logoutUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Not authenticated");

    await User.findByIdAndUpdate(
      req.user._id,
      { refreshToken: undefined },
      { new: true }
    );

    res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, {}, "User logged out"));
  }
);

const refreshAccessToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) throw new ApiError(401, "Missing refresh token");

    const decoded = jwt.verify(
      incomingRefreshToken,
      ENV.REFRESH_TOKEN_SECRET
    ) as { _id: string };

    const user = (await User.findById(decoded._id)) as UserDocument;
    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(403, "Invalid refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id.toString());

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
  }
);

const getCurrentUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) throw new ApiError(401, "Unauthorized");

    const { _id, name, email } = user;
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: { _id, name, email } },
          "Current user fetched"
        )
      );
  }
);

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
};
