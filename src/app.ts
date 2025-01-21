import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import logTheEvent from "./middlewares/logEventsMW.js";
import teacherRoute from "./Routes/teacherRoute.js";
import auth from "./Routes/authRoute.js";
import errorMW from "./middlewares/errorMW.js";
import student from "./Routes/studentRoute.js";
import course from "./Routes/courseRoute.js";
import refreshToken from "./Routes/refreshRoute.js";
import logout from "./Routes/logoutRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middlewares
// we use this middleware because the res.body() is going to be undefined that middleware allow express to read the body that is send with the post, put and patch requests.
app.use(express.urlencoded({ extended: true }));
// to make sure express will understand the incoming request as JSON
app.use(express.json());
// to make express understand the cookie that is send with the request
app.use(cookieParser());
// to secure the app by setting various HTTP headers
app.use(helmet());
// to log every thing that is happening on the server
app.use((req, res, nxt) => {
  console.log(`${req.method}\t${req.path}`);
  logTheEvent(`${req.method}\t${req.headers.origin}\t${req.url}`);
  nxt();
});

// Routes
app.use("/auth", auth);
app.use("/teacher", teacherRoute);
app.use("/student", student);
app.use("/course", course);
app.use("/refresh", refreshToken);
app.use("/logout", logout);

app.use(errorMW);
// Database connection
mongoose
  .connect(`${process.env.DatabaseLink}`)
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
