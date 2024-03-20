import logger from "../utils/logger.js";

export const loggerMiddleware = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} in ${req.url} - ${new Date().toLocaleDateString}`
  );
  next();
};
