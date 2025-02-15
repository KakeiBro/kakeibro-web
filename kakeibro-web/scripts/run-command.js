import { execSync } from "child_process";

export function runCommand(command, errorMessage, allowFailure = false, customMessage = '') {
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