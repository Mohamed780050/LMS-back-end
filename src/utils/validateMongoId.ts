import mongoose from "mongoose";
export default function validateIds(Ids: string[]) {
  const myArr = Ids.map((id) => mongoose.Types.ObjectId.isValid(id));
  return myArr.every((item) => item === true)
}
