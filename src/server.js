"use strict";

const APP_PORT = process.env.APP_PORT || 3000;
const DB_USERNAME = process.env.DB_USERNAME || "admin";
const DB_PASSWORD = process.env.DB_PASSWORD || "secret";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";

const server = require("./app")({
  logger: {
    level: "info",
    prettyPrint: true,
  },
});

server.register(
  require("fastify-mongoose-driver").plugin,
  {
    uri: `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`,
    settings: {
      useNewUrlParser: true,
      config: {
        autoIndex: true,
      },
    },
    useNameAndAlias: true,
  },
  (err) => {
    if (err) throw err;
  }
);

server
  .ready()
  .then(() => server.listen(APP_PORT, "0.0.0.0"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
