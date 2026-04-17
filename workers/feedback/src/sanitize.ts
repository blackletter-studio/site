/**
 * Sanitize user-supplied text before it ends up in a GitHub issue body.
 */
export function sanitizeForMarkdown(s: string, maxLen = 10_000): string {
  const noTags = s.replace(/<[^>]*>/g, "");
  const normalized = noTags.normalize("NFC");
  const escaped = normalized
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/```/g, "\\`\\`\\`");
  return escaped.slice(0, maxLen);
}

/** Redact the sender's IP address to /24 for privacy. */
export function redactIp(ip: string): string {
  const parts = ip.split(".");
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.x`;
  const v6 = ip.split(":");
  if (v6.length > 4) return v6.slice(0, 4).join(":") + ":…";
  return ip;
}
