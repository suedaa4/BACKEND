const request = require("supertest");
const app = require("./app");
const { describe, it, expect } = require("vitest");

describe("GET /api/projects", () => {
  it("should return a paginated list of projects", async () => {
    const res = await request(app).get("/api/projects");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("totalProjects");
    expect(res.body).toHaveProperty("totalPages");
    expect(res.body).toHaveProperty("currentPage");
    expect(res.body).toHaveProperty("projects");
    expect(Array.isArray(res.body.projects)).toBe(true);
  });
});
