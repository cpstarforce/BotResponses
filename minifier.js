/*

  What is this?

    This is a simple text response minifier that converts a text file into the required format for Discord bot simulation. You can run this Node.js script in the terminal.

  How does this work?

    Refer to the README.md file for detailed instructions on how to utilize this script.

*/

import fs from 'fs';
import path from 'path';
import { basename, join, dirname as getDirname, extname } from 'path';

const args = process.argv.slice(2);
const inputPath = args[0];
const absoluteInputPath = path.resolve(inputPath);
const inputDir = getDirname(absoluteInputPath);
const outputDir = join(inputDir, '.min');
const inputFileName = basename(inputPath, extname(inputPath));
const outputFile = join(outputDir, `${inputFileName}.min.txt`);

if (args.length === 0) {
  console.error("[BotResponses/minifier] Please provide a text file path.");
  process.exit(1);
}

if (!args[0].endsWith('.txt')) {
  console.error("[BotResponses/minifier] The file must be a text file ending in '.txt'.");
  process.exit(1);
}

if (!fs.existsSync(args[0])) {
  console.error(`[BotResponses/minifier] The file ${args[0]} does not exist.`);
  process.exit(1);
}

let input = args[0];
if (fs.existsSync(input)) input = fs.readFileSync(input, 'utf-8');

if (!fs.existsSync(outputDir)) {
  console.log(`[BotResponses/minifier] Creating directory ${outputDir} as it does not exist.`);
  fs.mkdirSync(outputDir);
}

const minifiedContent = input.replace(/\n/g, ';').replace(';;', ';');
fs.writeFileSync(outputFile, minifiedContent, 'utf-8');

console.log(`[BotResponses/minifier] Finished saving minified response list to ${outputFile}.`);