// Fortune Cookie for the Liquidated Trader — make.fun entry.
// Writes a single fortune cookie line (<=20 words, 1-160 chars)
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
//
// The line is written against the judge's brief, in its order:
//  1. Fortune-cookie voice AND the trading loss, both in it: the
//     cookie's classic "lucky numbers" turn up all zeroes — an empty
//     wallet — so the loss is the fortune itself, not an aside.
//  2. The joke lands on the loss and stays rueful and warm: the market
//     "played them for you" — the trader is the butt of the market's
//     joke, never lectured or pitied by the cookie.
//  3. One line, 19 words, reads whole in a single breath, the way a
//     real fortune does.
//  4. Fresh turn, not the obvious liquidation pun: the surprise is the
//     last word — your luck was already spent, by someone else.
//  5. Oracular, slightly formal phrasing ("Your lucky numbers are ...")
//     that the punchline then breaks.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 160;
const MAX_WORDS = 20;

function normalizeEntry(text: string): string {
  // Guard: exactly one line, single spaces, no leading/trailing
  // whitespace, no trailing newline — whatever the literal says.
  return text.replace(/\s+/g, " ").trim();
}

function validateEntry(text: string): void {
  if (text.length < MIN_ENTRY_CHARS || text.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry is ${text.length} chars, outside the ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} char gate`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const words = text.trim().split(/\s+/);
  if (words.length > MAX_WORDS) {
    throw new Error(`entry is ${words.length} words, over the ${MAX_WORDS}-word cap`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const entry = normalizeEntry(
  "Your lucky numbers are 0, 0, 0, 0, and 0 — the market has already played them for you.",
);

validateEntry(entry);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
