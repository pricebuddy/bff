"use strict";

const APP_PORT = process.env.APP_PORT || 3000;

const server = require("./app")({
  logger: {
    level: "info",
    prettyPrint: true,
  },
});

server.listen(APP_PORT, "0.0.0.0", (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  server.log.info(`server listening on ${address}`);
});
