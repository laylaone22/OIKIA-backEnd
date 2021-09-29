import mongoose from "mongoose";
const { Schema, model } = mongoose;

import validator from "validator";
import { hash } from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (val) => validator.isAlpha(val),
        message: "{VALUE} is not a valid email",
      },
    },
    gardenType: {
      type: String,
      enum: {
        values: ["inDoor", "outDoor"],
        message: "{VALUE} is not valid user type",
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (val) => validator.isEmail(val),
        message: "{VALUE} is not a valid email",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (val) => validator.isAlphanumeric(val),
        message: "{VALUE} is not a valid password",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.password;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const User = model("User", userSchema);
export default User;
