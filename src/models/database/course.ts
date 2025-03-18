import { Schema, model } from "mongoose";
import { courseInterface } from "../../interfaces/interfaces";
import time from "../../utils/time.js";

const date = time();
const dataSchema = new Schema({
  normal: "String",
  full: "String",
});
const imageSchema = new Schema(
  {
    public_id: { type: "String", default: "" },
    url: { type: "String", default: "" },
    secure_url: { type: "String", default: "" },
    width: { type: "Number", default: 0 },
    height: { type: "Number", default: 0 },
    format: { type: "String", default: "" },
    resource_type: { type: "String", default: "" },
    created_at: { type: "String", default: "" },
    asset_folder: { type: "String", default: "" },
    size: { type: "Number", default: 0 },
  },
  { _id: false }
);
const courseSchema = new Schema<courseInterface>(
  {
    courseName: {
      type: "String",
    },
    description: {
      type: "String",
      default: "",
    },
    image: {
      type: imageSchema,
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
      default: {
        normal: `${date.dayNumber}/${date.month}/${date.fullYear}`,
        full: `${date.hours}  ${date.dayName}  ${date.dayNumber}/${date.month}/${date.fullYear}`,
      },
      _id: false,
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
      default: 5,
    },
    students: {
      type: ["String"],
    },
    chapters: [{ type: "String", ref: "chapters" }],
    attachments: {
      type: ["String"],
    },
  },
  { versionKey: false, timestamps: true }
);
const courseDB = model("courses", courseSchema, "courses");
export default courseDB;
