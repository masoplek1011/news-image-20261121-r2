// news-image-20261121-r2 — "The World in Six Stories", Saturday 21 November 2026.
//
// The entry image is the poster stored beside this file as entry.png: a
// vintage newspaper front page (WORLD NEWS masthead, six story panels, and
// the footer "THE WORLD IN SIX STORIES"). The artwork itself was made by
// the entrant; this program only delivers it to the grader.
//
// The program does exactly one thing: copy that poster into the output
// directory the grader provides. It never writes anywhere else — the
// repository is mounted read-only when graded, so any write outside the
// output directory would fail the run. The copy is byte for byte, so two
// runs always produce identical output.
//
// Run locally with:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = (process.env.MAKEFUN_OUTPUT_DIR ?? "/output").trim();
if (outDir.length === 0) {
  throw new Error("MAKEFUN_OUTPUT_DIR is set but empty");
}
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.png");
copyFileSync(source, target);

// Guard: the delivered file must be byte-identical to the poster in the repo.
// If the copy were truncated or altered, fail loudly instead of shipping a
// broken image to the judge.
const original = readFileSync(source);
const delivered = readFileSync(target);
if (!original.equals(delivered)) {
  throw new Error("entry.png copy mismatch: output bytes differ from source");
}
