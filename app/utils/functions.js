const generateRandomOtp = (length = 5) => {
  if (!Number.isInteger(length)) return;
  const lastNumber = Number("9".repeat(length));
  return Math.floor(Math.random() * lastNumber);
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

module.exports = {
  generateRandomOtp,
  expireAfterMinutes,
  normalizePhone,
  phoneIsValid,
};
