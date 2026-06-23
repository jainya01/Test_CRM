import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 100,
  max: 20,
  message: {
    success: true,
    message: "too many login attempt, try again after 5 minutes",
  },
});

export default limiter;
