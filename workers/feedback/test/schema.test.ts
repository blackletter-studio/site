import { describe, it, expect } from "vitest";
import { FeedbackSubmission } from "../src/schema";

describe("FeedbackSubmission schema", () => {
  it("accepts a minimal valid submission", () => {
    const result = FeedbackSubmission.safeParse({
      category: "feature",
      title: "Add a way to preview the strip before committing",
      body: "Lawyers often want to see what would be removed before saving. A preview mode would help.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a submission with an unknown category", () => {
    const result = FeedbackSubmission.safeParse({
      category: "random",
      title: "Hi",
      body: "This should not be accepted because the title is too short and category is invalid.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a submission that triggers the honeypot", () => {
    const result = FeedbackSubmission.safeParse({
      category: "feature",
      title: "Legit title ok",
      body: "Legitimate body text that is long enough to pass the length check.",
      website: "http://example.com",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("honeypot");
    }
  });

  it("accepts a submission with optional name and email", () => {
    const result = FeedbackSubmission.safeParse({
      category: "bug-fair-copy",
      title: "Clean button crashes on 500-page doc",
      body: "When I click Clean on a document with more than 500 pages, Word freezes for 30 seconds.",
      name: "Jane Counsel",
      email: "jane@example-firm.com",
      role: "lawyer",
    });
    expect(result.success).toBe(true);
  });
});
