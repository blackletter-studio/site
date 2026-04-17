/**
 * Per-request-IP rate limit: relies on Cloudflare's edge Rate Limiting Rule
 * (configured in Task 10). This is a belt-and-suspenders fallback check.
 */
export function isOverLimit(request: Request): boolean {
  return request.headers.get("cf-ratelimit-exceeded") === "true";
}
