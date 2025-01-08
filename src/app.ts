import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
dotenv.config();

const app = express();
const port = process.env.PORT

// Middlewares
// we use this middleware because the res.body() is going to be undefined that middleware allow express to read the body that is send with the post, put and patch requests.
app.use(express.urlencoded({ extended: true }));
// to make sure express will understand the incoming request as JSON
app.use(express.json());
// to make express understand the cookie that is send with the request
app.use(cookieParser())
// to secure the app by setting various HTTP headers
app.use(helmet());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
