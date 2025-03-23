import { JwtPayload } from "jsonwebtoken";
export interface chapterInterface {
  chapterName: string;
  courseId: string;
  teacherId: string;
  isFree: boolean;
  isPublished: boolean;
  description: string;
  video: { kind: "youtube" | "private" | ""; url: string };
  position: number;
  completed: number;
  date: { normal: string; full: string };
  total: 3;
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
  verificationCode: string;
  verificationCodeExpire: Date;
  studentsNumber?: number;
  courseNumber?: number;
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
  courses?: string[];
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordTokenExpire: Date;
  verificationCode: string;
  verificationCodeExpire: Date;
}
export interface courseInterface {
  courseName: string;
  description: string;
  image: {
    public_id: string;
    url: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    asset_folder: string;
    size: number;
  };
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
  chapters: string[] | chapterInterface[];
  attachments: string[];
}
export interface refreshTokenPayloadInterface extends JwtPayload {
  userId: string;
}
export interface PurchaseInterface {
  studentId: string,
  courseId: string,
  purchasedAt:Date,
  completedChapters: string[], // Track completed chapters
  progress: number, // Course progress percentage
  completed: boolean, // If the student finished the course
}