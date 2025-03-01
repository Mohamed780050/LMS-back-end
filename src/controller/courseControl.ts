import Course from "../models/courseModel.js";
import { Request, Response } from "express";

async function getACourse(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ data: "id is required" });
      return;
    }
    const response = await Course.getACourse(id);
    res.status(response.statusCode).json({ course: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}
async function addANewCourse(req: Request, res: Response) {
  try {
    const [courseName, teacherId] = [req.body.courseName, req.params.userId];
    if (!courseName || !teacherId) {
      res.status(400).json({ data: "course name and teacher id are required" });
    }
    const course = new Course(courseName, teacherId);
    const response = await course.createACourse();
    res.status(response.statusCode).json({ id: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}
async function deleteACourse(req: Request, res: Response) {
  try {
    const { id, userId } = req.params;
    if (!id || !userId) {
      res.status(400).json({ data: "id is required" });
      return;
    }
    const response = await Course.deleteACourse(id, userId);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server error" });
  }
}
async function updateCourseName(req: Request, res: Response) {
  try {
    const [courseName, teacherId, courseId] = [
      req.body.courseName,
      req.params.userId,
      req.params.id,
    ];
    if (!courseName || !teacherId || !courseId) {
      res.status(400).json({ data: "course name and teacher id are required" });
    }
    const response = await Course.updateName(courseId, teacherId, courseName);
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}
async function updateCourseDescription(req: Request, res: Response) {
  try {
    const [courseDescription, teacherId, courseId] = [
      req.body.courseDescription,
      req.params.userId,
      req.params.id,
    ];
    if (!courseDescription || !teacherId || !courseId) {
      res
        .status(400)
        .json({ data: "course description and teacher id are required" });
    }
    const response = await Course.updateDescription(
      courseId,
      teacherId,
      courseDescription
    );
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}
async function updateCourseCategory(req: Request, res: Response) {
  try {
    const [courseCategory, teacherId, courseId] = [
      req.body.courseCategory,
      req.params.userId,
      req.params.id,
    ];
    if (!courseCategory || !teacherId || !courseId) {
      res
        .status(400)
        .json({ data: "course description and teacher id are required" });
    }
    const response = await Course.updateCategory(
      courseId,
      teacherId,
      courseCategory
    );
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}
async function updateCoursePrice(req: Request, res: Response) {
  try {
    const [coursePrice, teacherId, courseId] = [
      req.body.coursePrice,
      req.params.userId,
      req.params.id,
    ];
    if (!coursePrice || !teacherId || !courseId) {
      res
        .status(400)
        .json({ data: "course description and teacher id are required" });
    }
    const number = parseInt(`${coursePrice}`);
    if (isNaN(number)) res.status(400).json({ date: "number is required" });
    const response = await Course.updatePrice(courseId, teacherId, coursePrice);
    res.status(response.statusCode).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Internal server Error" });
  }
}

export default {
  getACourse,
  addANewCourse,
  deleteACourse,
  updateCourseName,
  updateCourseDescription,
  updateCourseCategory,
  updateCoursePrice,
};
