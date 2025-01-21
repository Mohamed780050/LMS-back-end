function GetTheTime() {
  const nowData = new Date();
  const fullYear = nowData.getFullYear();
  const month = nowData.getMonth() + 1;
  const dayNumber = nowData.getUTCDate();
  const hours = nowData.toLocaleTimeString("en", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  const dayName = nowData.toLocaleDateString("en", { weekday: "long" });
  return { fullYear, month, dayNumber, hours, dayName };
}
export default GetTheTime;
