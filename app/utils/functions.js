const generateRandomOtp = (length = 5) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length);
  return Math.floor(Math.random() * (max - min) + min);
};
const expireAfterMinutes = (minutes) => {
  if (!Number.isInteger(minutes)) return;
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};
const normalizePhone = (phone) => {
  if (typeof phone !== "string") return;
  if (!phoneIsValid(phone)) return;
  const normalize = phone.substring(phone.length, phone.length - 10).trim();
  return normalize;
};
const phoneIsValid = (phone) => {
  if (typeof phone !== "string") return;
  const match = /^(98|\+98|0)?9[0-9]{9}$/;
  return match.test(phone);
};
const resSuccess = (message = null, status = 200) => {
  if (!Number.isInteger(status)) return;
  message = message ? message : "درخواست شما موفقیت آمیز بود";
  return {
    message,
    status,
    success: true,
  };
};
module.exports = {
  generateRandomOtp,
  expireAfterMinutes,
  normalizePhone,
  phoneIsValid,
  resSuccess,
};
