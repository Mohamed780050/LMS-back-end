import express from 'express';
import teacherControl from '../controller/teacherControl.js';
const router = express.Router();
router.route("/").get(teacherControl.getAllTeachers);
export default router