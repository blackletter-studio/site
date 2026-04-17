import type { FeedbackSubmission } from "./schema";
import { sanitizeForMarkdown, redactIp } from "./sanitize";

interface CreateIssueArgs {
  token: string;
  repo: string;
  submission: FeedbackSubmission;
  senderIp: string;
  userAgent: string;
}

export async function createIntakeIssue({
  token,
  repo,
  submission,
  senderIp,
  userAgent,
}: CreateIssueArgs): Promise<{ number: number; url: string }> {
  const labels = [
    "from-form",
    `category: ${submission.category}`,
    "needs-triage",
  ];
  const title = sanitizeForMarkdown(submission.title, 120);
  const body = [
    sanitizeForMarkdown(submission.body, 5000),
    "",
    "---",
    "",
    "<details><summary>Submission metadata</summary>",
    "",
    `- **Submitted at**: ${new Date().toISOString()}`,
    `- **IP (redacted)**: ${redactIp(senderIp)}`,
    `- **User-Agent**: ${sanitizeForMarkdown(userAgent.slice(0, 200))}`,
    submission.name
      ? `- **Name (provided)**: ${sanitizeForMarkdown(submission.name, 80)}`
      : "",
    submission.email
      ? `- **Email (provided)**: ${sanitizeForMarkdown(submission.email, 120)}`
      : "",
    submission.role ? `- **Role**: ${submission.role}` : "",
    "",
    "</details>",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "blackletter-feedback-worker/0.1.0",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, labels }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${detail.slice(0, 200)}`);
  }

  const issue = (await res.json()) as { number: number; html_url: string };
  return { number: issue.number, url: issue.html_url };
}
