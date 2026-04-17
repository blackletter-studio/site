import { Hono } from "hono";
import { cors } from "hono/cors";
import { FeedbackSubmission } from "./schema";
import { createIntakeIssue } from "./github";
import { isOverLimit } from "./rate-limit";

type Env = {
  GITHUB_TOKEN: string;
  INTAKE_REPO: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use(
  "/api/*",
  cors({
    origin: ["https://blackletter.studio"],
    allowMethods: ["POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

app.post("/api/submit", async (c) => {
  if (isOverLimit(c.req.raw)) {
    return c.json(
      { error: "too many requests, please wait an hour and try again" },
      429,
    );
  }

  const raw = await c.req.json().catch(() => null);
  if (raw === null) {
    return c.json({ error: "invalid JSON body" }, 400);
  }

  const parsed = FeedbackSubmission.safeParse(raw);
  if (!parsed.success) {
    return c.json(
      { error: "validation failed", issues: parsed.error.issues },
      400,
    );
  }

  try {
    const issue = await createIntakeIssue({
      token: c.env.GITHUB_TOKEN,
      repo: c.env.INTAKE_REPO,
      submission: parsed.data,
      senderIp: c.req.header("cf-connecting-ip") ?? "unknown",
      userAgent: c.req.header("user-agent") ?? "unknown",
    });
    return c.json({ ok: true, issue: issue.number, url: issue.url });
  } catch (err) {
    console.error("createIntakeIssue failed:", err);
    return c.json(
      {
        error:
          "could not file the issue — please email hello@blackletter.studio",
      },
      502,
    );
  }
});

app.get("/api/health", (c) => c.json({ ok: true, version: "0.1.0" }));

export default app;
