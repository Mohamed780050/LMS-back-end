import { Schema, model } from "mongoose";
import { courseInterface } from "../../interfaces/interfaces";

const courseSchema = new Schema<courseInterface>({
  courseName: {
    type: "String",
  },
  description: {
    type: "String",
  },
  imageURL: {
    type: "String",
  },
  price: {
    type: "Number",
  },
  isPublished: {
    type: "Boolean",
  },
  date: {
    type: new Schema({
      normal: "",
      full: "",
    }),
  },
  rating: {
    type: "Number",
  },
  category: {
    type: "String",
  },
  teacherId: {
    type: "String",
  },
  completed: {
    type: "Number",
  },
  total: {
    type: "Number",
  },
  students: {
    type: ["String"],
  },
  chapters: {
    type: ["String"],
  },
  attachments: {
    type: ["String"],
  },
});
const courseDB = model("courses", courseSchema, "courses");
export default courseDB;
