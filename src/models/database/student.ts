import { Schema, model } from "mongoose";
import { studentInterface } from "../../interfaces/interfaces";

const studentSchema = new Schema<studentInterface>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    courses: {
      type: [String],
      default: [],
    },
    refreshToken: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const studentBD = model("students", studentSchema, "students");
export default studentBD;
