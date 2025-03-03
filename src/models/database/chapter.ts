import { Schema, model } from "mongoose";
import { chapterInterface } from "../../interfaces/interfaces";
import time from "../../utils/time.js";

const date = time();
const dataSchema = new Schema({
  normal: "String",
  full: "String",
});
const videoSchema = new Schema({
  kind: "String",
  url: "string",
});
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
    complete: { type: "Number", default: 1 },
    date: {
      type: dataSchema,
      default: {
        normal: `${date.dayNumber}/${date.month}/${date.fullYear}`,
        full: `${date.hours}  ${date.dayName}  ${date.dayNumber}/${date.month}/${date.fullYear}`,
      },
      _id: false,
    },
  },
  { versionKey: false }
);

const chapterDB = model("chapters", chapterSchema, "chapters");
export default chapterDB;
