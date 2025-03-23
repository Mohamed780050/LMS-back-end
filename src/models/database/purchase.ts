import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
  studentId: { type: "string", ref: "students", required: true },
  courseId: { type: "string", ref: "courses", required: true },
  purchasedAt: { type: Date, default: Date.now },
  completedChapters: [{ type: Schema.Types.ObjectId, ref: "chapters" }], // Track completed chapters
  progress: { type: Number, default: 0 }, // Course progress percentage
  completed: { type: Boolean, default: false }, // If the student finished the course
});

const purchaseDB = model("Purchases", purchaseSchema, "Purchases");
export default purchaseDB;
