import { config } from "./config/env.config.js";
import httpServer from "./config/server/http.config.js";
import socketServer from "./config/server/socket.config.js";

import logger from "./utils/logger.js";

const PORT = config.port;

const initializeServer = async () => {
  try {
    socketServer;

    httpServer.listen(PORT, () => {
      logger.info(`[Server] - Server is running on port ${PORT}`);

      if (config.TESTS === true) {
        tests();
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

initializeServer();
