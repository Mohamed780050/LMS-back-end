import { Types } from "mongoose";
export default function validateIds(Ids: string[]) {
  const myArr = Ids.map((id) => Types.ObjectId.isValid(id));
  return myArr.every((item) => item === true);
}
