import { execSync } from "child_process";

export function debugChecker() {
    console.log("\n🛑 Checking for console logs and debugger statements...");
    const stagedFiles = execSync("git diff --cached --name-only --diff-filter=ACM", { encoding: "utf8" })
      .split("\n")
      .filter((file) => 
        (!file.includes('.husky') && !file.includes('scripts/')) && 
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
}