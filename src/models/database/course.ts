import { Schema, model } from "mongoose";
import { courseInterface } from "../../interfaces/interfaces";

const dataSchema = new Schema({
  normal: "String",
  full: "String",
});
const courseSchema = new Schema<courseInterface>(
  {
    courseName: {
      type: "String",
    },
    description: {
      type: "String",
      default: "",
    },
    imageURL: {
      type: "String",
      default: "",
    },
    price: {
      type: "Number",
      default: 0,
    },
    isPublished: {
      type: "Boolean",
      default: false,
    },
    date: {
      type: dataSchema,
    },
    rating: {
      type: "Number",
      default: 0,
    },
    category: {
      type: "String",
      default: "",
    },
    teacherId: {
      type: "String",
    },
    completed: {
      type: "Number",
      default: 1,
    },
    total: {
      type: "Number",
      default: 6,
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
  },
  { versionKey: false }
);
const courseDB = model("courses", courseSchema, "courses");
export default courseDB;
