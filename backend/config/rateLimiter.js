import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 100 * 60,
  max: 20,
  message: {
    succeess: true,
    message: "too many login attempt, try again after 5 minutes",
  },
});

export default limiter;
