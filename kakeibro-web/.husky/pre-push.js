#!/usr/bin/env node

import { execSync } from "child_process";
import { debugChecker } from "../scripts/debug-check.js";

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

runCommand(
  "pnpm audit",
  "Packages with vulnerabilities found. Update them."
);

// Run console logs and debug statements check (custom implementation)
debugChecker();

console.log("\n✅ Pre-commit checks passed!");
