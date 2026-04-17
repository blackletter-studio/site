import { describe, it, expect } from "vitest";
import { sanitizeForMarkdown, redactIp } from "../src/sanitize";

describe("sanitizeForMarkdown", () => {
  it("strips HTML tags", () => {
    expect(
      sanitizeForMarkdown('Hello <script>alert("xss")</script> world'),
    ).toBe('Hello alert("xss") world');
  });

  it("escapes fenced code blocks", () => {
    expect(sanitizeForMarkdown("```\nevil\n```")).toBe(
      "\\`\\`\\`\nevil\n\\`\\`\\`",
    );
  });

  it("normalizes line endings", () => {
    expect(sanitizeForMarkdown("line1\r\nline2")).toBe("line1\nline2");
  });

  it("truncates to maxLen", () => {
    expect(sanitizeForMarkdown("a".repeat(20), 5)).toBe("aaaaa");
  });
});

describe("redactIp", () => {
  it("redacts the last octet of IPv4", () => {
    expect(redactIp("192.168.1.42")).toBe("192.168.1.x");
  });

  it("truncates IPv6 to first 4 groups", () => {
    expect(redactIp("2001:db8:85a3:0:0:8a2e:370:7334")).toBe(
      "2001:db8:85a3:0:…",
    );
  });
});
