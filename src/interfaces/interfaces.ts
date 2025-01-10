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
  courses: string[];
  students: string[];
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
  courses?: {
    courseId: string;
    done: boolean;
    chapters: { chapterId: string; done: boolean }[];
  }[];
}
