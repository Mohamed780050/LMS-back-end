import { JwtPayload } from "jsonwebtoken";
export interface chapterInterface {
  chapterName: string;
  courseId: string;
  teacherId: string;
  isFree: boolean;
  isPublished: boolean;
  description: string;
  video: { type: "youtube" | "private"; url: string };
  position: number;
  complete: number;
  date: { normal: string; full: string };
}
export interface teacherInterface {
  userName: string;
  email: string;
  password: string;
  avatar: string;
  refreshToken: string;
  courses: string[];
  students: string[];
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordTokenExpire: Date;
}
export interface authInterface {
  identifier: string;
  password: string;
}
export interface studentInterface {
  userName: string;
  email: string;
  password: string;
  avatar?: string;
  refreshToken: string;
  courses?: {
    courseId: string;
    done: boolean;
    chapters: { chapterId: string; done: boolean }[];
  }[];
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordTokenExpire: Date;
}
export interface courseInterface {
  courseName: string;
  description: string;
  imageURL: string;
  price: number;
  isPublished: boolean;
  date: {
    normal: string;
    full: string;
  };
  rating: number;
  category: string;
  teacherId: string;
  completed: number;
  total: number;
  students: string[];
  chapters: string[];
  attachments: string[];
}

export interface refreshTokenPayloadInterface extends JwtPayload {
  userId: string;
}
