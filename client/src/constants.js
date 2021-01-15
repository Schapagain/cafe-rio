export const ROOT_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://cafe-rio.herokuapp.com"
    : "http://localhost:5000";

export const PAYMENT = {
  creditCard: "credit",
  stripe: "stripe",
  paypal: "paypal",
};
