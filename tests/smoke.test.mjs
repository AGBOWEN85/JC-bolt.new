import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Zero-dependency structural smoke tests: they run with the Node built-in
// test runner, so CI needs no test framework installed. The production
// build (npm run build, a separate CI step) is what verifies the app
// compiles; these tests verify the entry points and scripts it relies on.

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

test("package.json declares the scripts CI and deploy rely on", () => {
  for (const script of ["dev", "build", "lint", "preview", "test"]) {
    assert.ok(pkg.scripts?.[script], `missing script: ${script}`);
  }
  assert.notEqual(pkg.scripts.test.trim(), "npm test");
});

test("vite entry points exist and index.html loads main.tsx", () => {
  assert.ok(existsSync(join(root, "index.html")));
  assert.ok(existsSync(join(root, "src", "main.tsx")));
  assert.ok(existsSync(join(root, "src", "App.tsx")));
  const html = readFileSync(join(root, "index.html"), "utf8");
  assert.match(html, /\/src\/main\.tsx/);
});

test("vite and typescript configs exist", () => {
  assert.ok(existsSync(join(root, "vite.config.ts")));
  assert.ok(existsSync(join(root, "tsconfig.json")));
});
