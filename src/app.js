"use strict";
const fastify = require("fastify");
const products = require("../data/get-products.json");

const build = (options = {}) => {
  const app = fastify(options);

  app.get("/get-products", async (request, reply) => {
    return products;
  });

  return app;
};

module.exports = build;
