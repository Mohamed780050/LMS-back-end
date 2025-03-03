import { Request, Response } from "express";
import Chapter from "../models/chapterModel.js";
async function addNewChapter(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { chapterName, courseId } = req.body;
    const myChapter = new Chapter(userId, courseId);
    const response = await myChapter.save(chapterName);
    res.status(response.statusCode).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}
export default { addNewChapter };
