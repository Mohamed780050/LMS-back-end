import { Schema, model } from "mongoose";
import { chapterInterface } from "../../interfaces/interfaces";
import time from "../../utils/time.js";

const date = time();
const dataSchema = new Schema(
  {
    normal: "String",
    full: "String",
  },
  { _id: false }
);
const videoSchema = new Schema(
  {
    kind: "String",
    url: "string",
  },
  { _id: false }
);
const chapterSchema = new Schema<chapterInterface>(
  {
    chapterName: { type: "String" },
    courseId: { type: "String", required: true },
    teacherId: { type: "String", required: true },
    isFree: { type: "Boolean", default: false },
    isPublished: { type: "Boolean", default: false },
    description: { type: "String", default: "" },
    video: { type: videoSchema, default: { kind: "", url: "" } },
    position: { type: "Number" },
    completed: { type: "Number", default: 1 },
    date: {
      type: dataSchema,
      default: {
        normal: `${date.dayNumber}/${date.month}/${date.fullYear}`,
        full: `${date.hours}  ${date.dayName}  ${date.dayNumber}/${date.month}/${date.fullYear}`,
      },
      _id: false,
    },
    total: { type: "Number", default: 3 },
  },
  { versionKey: false, timestamps: true }
);

const chapterDB = model("chapters", chapterSchema, "chapters");
export default chapterDB;
