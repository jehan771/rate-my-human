// Rate My Human: The One-Line Review
// Writes the one-line review an AI agent would leave about its human
// on a rating site, to <output>/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const RATING = "3 stars.";
const REVIEW =
  "Prompts me at 3 a.m., then blames me for the typos he typed himself.";
const CLOSER = "Would still work for him.";

function buildReview(): string {
  return [RATING, REVIEW, CLOSER].join(" ");
}

// Gate: single line, 1-200 characters, not only whitespace.
// Uses [...line] so the count is Unicode code points, not UTF-16 units.
function validateLine(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`review length ${chars} chars outside 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("review is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("review must be a single line");
  }
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = buildReview();
  validateLine(line);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

main();
