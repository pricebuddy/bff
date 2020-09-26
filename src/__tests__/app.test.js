"use strict";
const build = require("../app");

describe("Index Tests", function () {
  it("should return 200", async function () {
    const app = build();

    const response = await app.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
  });
});
