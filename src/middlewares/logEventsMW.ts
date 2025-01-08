import path from "path";
import fs from "fs";
import crypto from "crypto";
const currentDate = new Date();
function logTheEvent(message: string = "", filename: string = "Logs.log") {
  let TheDate = `${currentDate.getUTCDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  let TheHour = `${currentDate.toLocaleTimeString("en", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  })}`;
  let TheDay = `${currentDate.toLocaleDateString("en", { weekday: "long" })}`;
  let fullInfo = `${TheHour} ${TheDay}\t${TheDate}\t${crypto.randomUUID()}\t${message}\n`;
  if (!fs.existsSync(path.join(process.cwd(), "Logs"))) {
    fs.mkdirSync(path.join(process.cwd(), "Logs"));
  } else {
    fs.appendFileSync(path.join(process.cwd(), "Logs", filename), fullInfo);
  }
}
export default logTheEvent;
