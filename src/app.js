"use strict";
const fastify = require("fastify");

const build = (options = {}) => {
  const app = fastify(options);

  app.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  return app;
};

module.exports = build;
