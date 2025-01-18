import { Schema,model } from "mongoose";
import { teacherInterface } from "../../interfaces/interfaces";
const teacherSchema = new Schema<teacherInterface>(
  {
    userName: {
      type: String,
      required: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    avatar: {
      type: String,
      required: false,
    },
    courses: {
      type: [String],
      required: false,
    },
    students: {
      type: [String],
      required: false,
    },
  },
  { versionKey: false }
);
const teacherDB = model<teacherInterface>("teachers", teacherSchema,"teachers");
export default teacherDB;