// // import { RequestHandler, Request, Response, NextFunction } from "express";
// // import mongoose, { InferSchemaType, model, Schema } from "mongoose";

// // const commentSchema = new Schema(
// //   {
// //     blogPostId: { type: mongoose.Schema.Types.ObjectId },
// //     parentCommentId: { type: mongoose.Schema.Types.ObjectId },
// //     author: { type: String, required: true },
// //     text: { type: String, required: true },
// //   },
// //   { timestamps: true }
// // );

// // type Comment = InferSchemaType<typeof commentSchema>;

// // export default model<Comment>("Comment", commentSchema);

// // import mongoose, { Model, Schema } from "mongoose";
// // import crypto from "crypto";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import User from "../interfaces/User";

// // import { Document } from "mongoose";

// // export interface User extends Document {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   password: string;
// //   role: string;
// //   resetPasswordToken: string;
// //   resetPasswordExpire: Date;
// // }

// // const userSchema: Schema = new mongoose.Schema(
// //   {
// //     firstName: {
// //       type: String,
// //       required: [true, "Please enter a first name"],
// //     },
// //     lastName: {
// //       type: String,
// //       required: [true, "Please enter a last name"],
// //     },
// //     email: {
// //       type: String,
// //       required: [true, "Please enter an email"],
// //       unique: true,
// //       match: [
// //         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
// //         "Please add a valid email",
// //       ],
// //     },
// //     password: {
// //       type: String,
// //       required: [true, "Please add a password"],
// //       minlength: 6,
// //       select: false,
// //     },
// //     role: {
// //       type: String,
// //       enum: ["admin", "customer"],
// //       default: "customer",
// //     },
// //     resetPasswordToken: String,
// //     resetPasswordExpire: Date,
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // userSchema.pre<User>("save", async function (next) {
// //   if (!this.isModified("password")) {
// //     next();
// //   }
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// // });

// // userSchema.methods.getSignedJwtToken = function (next: any) {
// //   // @ts-ignore
// //   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
// //     expiresIn: process.env.JWT_EXPIRES,
// //   });
// // };

// // userSchema.methods.matchPassword = async function (enteredPassword: string) {
// //   // @ts-ignore
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// // userSchema.methods.getResetPasswordToken = function () {
// //   const resetToken = crypto.randomBytes(20).toString("hex");
// //   // @ts-ignore
// //   this.resetPasswordToken = crypto
// //     .createHash("sha256")
// //     .update(resetToken)
// //     .digest("hex");
// //   // @ts-ignore
// //   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

// //   this.save(); // ???

// //   return resetToken;
// // };

// // export default mongoose.model("User", userSchema);

// // express.RequestHandler<
// //   {
// //     /* route params */
// //   },
// //   {
// //     /* response body */
// //   },
// //   {
// //     /* request body */
// //   },
// //   {
// //     /* query params */
// //   }
// // >;

// // interface CreateCommentParams {
// //   blogPostId: string;
// // }
// // interface CreateCommentBody {
// //   text: string;
// //   parentCommentId: string;
// // }
// // interface responseBody {}
// // interface urlQueryParams {}

// // export const createComment: RequestHandler<
// //   CreateCommentParams,
// //   responseBody,
// //   CreateCommentBody,
// //   urlQueryParams
// // > = async (req, res, next) => {
// //   const { blogPostId } = req.params;
// //   const { text, parentCommentId } = req.body;

// //   try {
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };

// // import { ErrorRequestHandler } from "express";
// // import { isHttpError } from "http-errors";

// // const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
// //   console.error(error);
// //   let statusCode = 500;
// //   let errorMessage = "An unknown error occurred";

// //   if (isHttpError(error)) {
// //     statusCode = error.status;
// //     errorMessage = error.message;
// //   }

// //   res.status(statusCode).json({ error: errorMessage });
// // };

// // /**
// //  * A function used to wrap asynchronous Express middlewares.
// //  * It catches async errors so Express can pass them to an error handling middleware.
// //  *
// //  * @param handler - An Express middleware function.
// //  *
// //  * @returns An Express middleware capable of catching asynchronous errors.
// //  */
// // export function wrapAsync(handler: RequestHandler): RequestHandler {
// //   return async (
// //     req: Request,
// //     res: Response,
// //     next: NextFunction
// //   ): Promise<void> => Promise.resolve(handler(req, res, next)).catch(next);
// // }

// const util = require("util");

// // Importing File System module
// const fs = require("fs");

// // Use promisify to convert callback
// // based method fs.readdir to
// // promise based method
// const readdir = util.promisify(fs.readdir);

// readdir("../models`")
//   .then((files) => {
//     console.log(files);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
