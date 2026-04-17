import { z } from "zod";

export const CATEGORIES = [
  "bug-fair-copy",
  "bug-proofmark",
  "feature",
  "licensing",
  "dictionary",
  "other",
] as const;

export const FeedbackSubmission = z.object({
  category: z.enum(CATEGORIES),
  title: z.string().min(3).max(120),
  body: z.string().min(10).max(5000),
  name: z
    .string()
    .max(80)
    .optional()
    .transform((s) => s?.trim() || undefined),
  email: z
    .string()
    .email()
    .optional()
    .transform((s) => s?.trim() || undefined),
  role: z
    .enum(["lawyer", "paralegal", "assistant", "firm-it", "other"])
    .optional(),
  website: z.string().max(0, "honeypot triggered").optional(),
});

export type FeedbackSubmission = z.infer<typeof FeedbackSubmission>;
