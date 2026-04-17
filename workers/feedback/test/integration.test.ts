import { describe, it, expect, vi, beforeEach } from "vitest";
import app from "../src/index";

const validBody = {
  category: "feature",
  title: "Add a way to preview the strip before committing",
  body: "Lawyers often want to see what would be removed before saving. A preview mode would help.",
};

describe("feedback Worker", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (url.includes("api.github.com")) {
          return new Response(
            JSON.stringify({
              number: 42,
              html_url: "https://github.com/x/y/issues/42",
            }),
            { status: 201 },
          );
        }
        return new Response("not found", { status: 404 });
      }),
    );
  });

  it("returns 400 for invalid JSON", async () => {
    const res = await app.request(
      "/api/submit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "not json",
      },
      { GITHUB_TOKEN: "test", INTAKE_REPO: "x/y" },
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for schema failures", async () => {
    const res = await app.request(
      "/api/submit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: "unknown", title: "a", body: "b" }),
      },
      { GITHUB_TOKEN: "test", INTAKE_REPO: "x/y" },
    );
    expect(res.status).toBe(400);
  });

  it("creates an issue and returns 200 for valid submissions", async () => {
    const res = await app.request(
      "/api/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cf-connecting-ip": "192.168.1.42",
        },
        body: JSON.stringify(validBody),
      },
      { GITHUB_TOKEN: "test", INTAKE_REPO: "x/y" },
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as { ok: boolean; issue: number };
    expect(body.ok).toBe(true);
    expect(body.issue).toBe(42);
  });

  it("returns 200 on /api/health", async () => {
    const res = await app.request(
      "/api/health",
      {},
      { GITHUB_TOKEN: "test", INTAKE_REPO: "x/y" },
    );
    expect(res.status).toBe(200);
  });
});
