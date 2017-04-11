// import * as request from "supertest";
// import {app} from "../src/server";

// import * as request from "supertest";
// import {default as app} from "../src/server";

let request = require("supertest");
let app = require("../src/server");

describe("GET /api", () => {
  it("should return 200 OK", (done) => {
    request(app)
      .get("/api")
      .expect(200, done);
  });
});

