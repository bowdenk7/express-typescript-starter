// import * as request from "supertest";
// import {app} from "../src/server";

let request = require("supertest");
let app = require("../src/server");

describe("GET /api", () => {
  it("should return 200 OK", () => {
    request(app)
      .get("/api")
      .expect(200);
  });
});

