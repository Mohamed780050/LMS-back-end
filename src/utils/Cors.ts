import { CorsOptions as CorsOptionsInterface } from "cors";
const port = process.env.PORT;
const whiteList = process.env.whit_list
  ?.replace(/\$\{PORT\}/g, `${port}`)
  .split(",");
console.log(whiteList);
export const CorsOptions: CorsOptionsInterface = {
  origin(origin, callback) {
    if (whiteList?.indexOf(`${origin}`) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
