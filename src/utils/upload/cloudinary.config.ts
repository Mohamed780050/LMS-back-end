import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

 cloudinary.config({
  cloud_name: `${process.env.cloudinary_cloud_name}`,
  api_key: `${process.env.cloudinary_api_key}`,
  api_secret: `${process.env.cloudinary_api_secret}`,
});

export async function uploadImage(image:string) {
  try {
    const result = await cloudinary.uploader.upload(image)
    return result
  } catch (err:any) {
    console.log(err)
    throw new Error(`${err.message}`)
  }
}