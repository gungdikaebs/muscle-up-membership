import { spawnSync } from "node:child_process";

const run = (command, args) =>
  spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: "inherit",
  });

const build = run("npm", ["run", "build"]);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const preview = run("npx", [
  "astro",
  "preview",
  "--background",
  "--host",
  "127.0.0.1",
]);

if (preview.status !== 0) {
  process.exit(preview.status ?? 1);
}

let testStatus = 1;

try {
  const tests = run("npx", ["playwright", "test", ...process.argv.slice(2)]);
  testStatus = tests.status ?? 1;
} finally {
  run("npx", ["astro", "preview", "stop"]);
}

process.exit(testStatus);
