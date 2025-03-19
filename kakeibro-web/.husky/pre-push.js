#!/usr/bin/env node

import { runCommand } from "../scripts/run-command.js";
import { debugChecker } from "../scripts/debug-check.js";

// Run linting with ESLint
runCommand("pnpm lint", "ESLint failed. Please fix the issues before committing.", false, '🔎 Checking code formatting...');

// Run TypeScript type checks (with build check)
runCommand("pnpm build", "TypeScript type checks failed. Please fix the issues before committing.", false, '🛠️ Running build and type checks...');

// Run unit tests
runCommand("pnpm pTest", "Tests failed. Please fix the failing tests before committing.", false, '✅ Running tests...');

// Run outdated package checks (but allow failures)
runCommand(
  "pnpm check-packages",
  "Outdated packages found. Consider updating them.",
  true, // Allow failure without stopping the commit,
  "🔍 Checking for outdated packages..."
);

runCommand(
  "pnpm audit",
  "Packages with vulnerabilities found. Update them.",
  false,
  "🔍 Checking for vulnerabilities..."
);

// Run console logs and debug statements check (custom implementation)
debugChecker();

console.log("\n✅ Pre-commit checks passed!");
