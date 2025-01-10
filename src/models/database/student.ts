import { Schema, model } from "mongoose";
import { studentInterface } from "../../interfaces/interfaces";
const chapterSchema = new Schema({
  chapterId: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});
const coursesSchema = new Schema({
  courseId: {
    type: String,
  },
  done: {
    type: Boolean,
    default: false,
  },
  chapters: {
    type: [chapterSchema],
    default: [],
  },
});
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
      type: [coursesSchema],
      default: [],
    },
  },
  { versionKey: false }
);
const studentBD = model("students", studentSchema, "students");
export default studentBD;
