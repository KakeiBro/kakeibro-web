#!/usr/bin/env node

import { execSync } from "child_process";

function runCommand(command, errorMessage, allowFailure = false, customMessage = '') {
  const startMessage = customMessage || `\nRunning: ${command}...`
  try {
    console.log(startMessage);
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    if (allowFailure) {
      console.warn(`⚠️ Warning: ${errorMessage}`);
    } else {
      console.error(`❌ ${errorMessage}`);
      process.exit(1);
    }
  }
}

// Run linting with ESLint
runCommand("pnpm lint", "ESLint failed. Please fix the issues before committing.", false, '🔎 Checking code formatting...');

// Run TypeScript type checks (with build check)
runCommand("pnpm build", "TypeScript type checks failed. Please fix the issues before committing.", false, '🛠️ Running build and type checks...');

// Run unit tests (uncomment when needed)
// runCommand("pnpm test run --coverage", "Tests failed. Please fix the failing tests before committing.", false, '✅ Running tests...');

// Run outdated package checks (but allow failures)
runCommand(
  "pnpm check-packages",
  "Outdated packages found. Consider updating them.",
  true, // Allow failure without stopping the commit,
  "Outdated packages found. Consider updating them."
);

// Run console logs and debug statements check (custom implementation)
console.log("\n🛑 Checking for console logs and debugger statements...");
const stagedFiles = execSync("git diff --cached --name-only --diff-filter=ACM", { encoding: "utf8" })
  .split("\n")
  .filter((file) => 
    !file.includes('.husky') && 
    file.endsWith(".js") || file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".jsx"));

let hasConsoleOrDebugger = false;

stagedFiles.forEach((file) => {
  if (!file) return;
  const content = execSync(`git show :${file}`, { encoding: "utf8" });
  if (content.match(/console\.log|debugger/)) {
    console.error(`❌ Found console.log or debugger in: ${file}`);
    hasConsoleOrDebugger = true;
  }
});

if (hasConsoleOrDebugger) {
  console.error("\n❌ Please remove console.log and debugger statements before committing.");
  process.exit(1);
}

console.log("\n✅ Pre-commit checks passed!");
