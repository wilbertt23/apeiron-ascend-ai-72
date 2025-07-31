const jsonString = `{
    "overallScore": 7,
    "playstyle": "aggressive",
    "metrics": {
      "apm": 120,
      "accuracy": 80,
      "efficiency": 70,
      "adaptability": 80
    },
    "skillData": {
      "offensiveness": 80,
      "defensiveness": 70,
      "manaManagement": 80,
      "skillUsage": 80,
      "tactics": 70,
      "positioning": 80
    },
    "negative_suggestion": "Be more cautious when using your abilities, as you sometimes waste them when they could be used more effectively.",
    "positive_suggestion": "Keep up the aggressive playstyle, but try to be more strategic with your ability usage to maximize their impact."
  }`
  ;

try {
  const parsed = JSON.parse(jsonString);
  console.log("Parsed JSON object:", parsed.overallScore);
} catch (e) {
  console.error("Failed to parse JSON:", e);
}
// To run this file, use the following command in your terminal:
//
//    node test.tsx
//
// Make sure you have Node.js installed. If you see an error about "Cannot use import statement outside a module" or similar, 
// rename the file to `test.js` or run it with `npx ts-node test.tsx` if you want to keep TypeScript/TSX syntax.
//
// If you don't have ts-node installed, you can install it globally with:
//    npm install -g ts-node
//
// Then run:
//    ts-node test.tsx
