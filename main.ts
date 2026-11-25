import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I told my boss I needed a mental health day, and he approved it, then asked me to present it as a case study.";

// Validasi: satu baris, panjang 1-200 karakter.
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`entry length ${TEXT.length} out of range 1-200`);
}
if (TEXT.includes("\n") || TEXT.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
const content = TEXT + "\n";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), content, "utf8");
if (Buffer.byteLength(content, "utf8") !== 110) {
  throw new Error(
    `entry byte length ${Buffer.byteLength(content, "utf8")} != 110`,
  );
}
console.log(`wrote ${join(outDir, "entry.txt")} (${content.length} bytes)`);
