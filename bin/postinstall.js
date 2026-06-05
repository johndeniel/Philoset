#!/usr/bin/env node

import { readdirSync, readFileSync, copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { cwd, exit, stdout, argv, stdin } from "node:process";
import { createInterface } from "node:readline";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, "..", "docs", "philosophy");
const VERSION = "1.3.3";

const useColor = stdout.isTTY && !process.env.NO_COLOR;
const R = "\x1b[0m";
const wrap = (code) => (t) => (useColor ? `\x1b[${code}m${t}${R}` : t);
const s = {
  bold: wrap(1),
  dim: wrap(2),
  red: wrap(31),
  green: wrap(32),
  yellow: wrap(33),
  cyan: wrap(36),
};

function parseFrontmatter(file) {
  try {
    const content = readFileSync(join(SRC, file), "utf8");
    const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) return {};
    const out = {};
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i === -1) continue;
      const k = line.slice(0, i).trim();
      const v = line.slice(i + 1).trim();
      if (k) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function listFiles() {
  try {
    return readdirSync(SRC).filter((f) => f.endsWith(".md"));
  } catch {
    error("Philosophy directory not found.");
  }
}

function error(msg) {
  console.error(`\n  ${s.red("✗")} ${msg}\n`);
  exit(1);
}

function printHelp() {
  console.log(`
  ${s.bold("philoset")} ${s.dim(`v${VERSION}`)}

  ${s.bold("Usage:")}
    philoset list
    philoset add [name] [--force] [--all]
    philoset --version | --help

  ${s.bold("Commands:")}
    ${s.cyan("list")}              List available philosophy documents
    ${s.cyan("add [name]")}        Add a document (interactive if name is omitted)

  ${s.bold("Options:")}
    ${s.cyan("-f, --force")}       Overwrite existing files
    ${s.cyan("-a, --all")}         Add all available documents
    ${s.cyan("-V, --version")}     Print version
    ${s.cyan("-h, --help")}        Print this help
`);
}

function runList() {
  const list = listFiles();

  if (!list.length) {
    console.log(s.yellow("\n  No philosophy files available.\n"));
    return;
  }

  console.log();
  console.log(`  ${s.bold("Available documents")}`);
  console.log(`  ${s.dim("─".repeat(40))}`);
  for (const f of list) {
    const meta = parseFrontmatter(f);
    if (meta.description) {
      const label = f.replace(/\.md$/, "");
      console.log(`  ${s.cyan(label.padEnd(24))} ${s.dim(meta.description)}`);
    } else {
      console.log(`  ${s.cyan("●")} ${f}`);
    }
  }
  console.log();
}

function findMatch(list, name) {
  const lower = name.toLowerCase();
  return (
    list.find((f) => f.toLowerCase() === `${lower}.md`) ||
    list.find((f) => f.toLowerCase().startsWith(lower))
  );
}

async function runAdd(name, opts) {
  if (opts.all && name) {
    error(`Cannot use both a name and --all. Use either \`philoset add ${name}\` or \`philoset add --all\`.`);
  }
  const list = listFiles();
  const dest = join(cwd(), "docs", "philosophy");
  mkdirSync(dest, { recursive: true });

  let toAdd = [];

  if (opts.all) {
    toAdd = [...list];
  } else if (name) {
    const match = findMatch(list, name);
    if (!match) error(`No file matching "${name}". Available: ${list.join(", ")}`);
    toAdd = [match];
  } else {
    console.log();
    console.log(`  ${s.bold("Available:")}`);
    const installed = list.map((f) => existsSync(join(dest, f)));
    for (let i = 0; i < list.length; i++) {
      const f = list[i];
      if (installed[i]) {
        console.log(`    ${s.green("✓")} ${s.dim(f)} ${s.dim("(installed)")}`);
      } else {
        console.log(`    ${s.cyan("○")} ${f}`);
      }
    }
    console.log();
    const rl = createInterface({ input: stdin, output: stdout });
    try {
      const answer = (
        await new Promise((resolve) =>
          rl.question(
            `  ${s.bold("Pick a name")} ${s.dim("(comma-separated, or 'all')")}: `,
            resolve
          )
        )
      ).trim();
      if (!answer) {
        console.log("  No files selected.\n");
        return;
      }
      if (answer.toLowerCase() === "all") {
        toAdd = opts.force
          ? [...list]
          : list.filter((_, i) => !installed[i]);
        if (!toAdd.length) {
          console.log(`  ${s.yellow("⚠")}  All files already installed. Use --force to overwrite.\n`);
          return;
        }
      } else {
        for (const p of answer.split(",").map((p) => p.trim()).filter(Boolean)) {
          const m = findMatch(list, p);
          if (m) toAdd.push(m);
          else error(`No file matching "${p}". Available: ${list.join(", ")}`);
        }
      }
    } finally {
      rl.close();
    }
  }

  console.log();
  let added = 0;
  let skipped = 0;
  let overwritten = 0;

  for (const f of toAdd) {
    const target = join(dest, f);
    const exists = existsSync(target);
    if (exists && !opts.force) {
      console.log(`  ${s.yellow("⚠")}  ${f} ${s.dim("(skipped, exists)")}`);
      skipped++;
      continue;
    }
    try {
      copyFileSync(join(SRC, f), target);
    } catch (err) {
      error(`Failed to copy ${f}: ${err.message}`);
    }
    if (exists) {
      console.log(`  ${s.cyan("↻")}  ${f} ${s.dim("(overwritten)")}`);
      overwritten++;
    } else {
      console.log(`  ${s.green("✓")}  ${f}`);
      added++;
    }
  }

  if (toAdd.length > 1) {
    const parts = [];
    if (added) parts.push(s.green(`${added} added`));
    if (skipped) parts.push(s.yellow(`${skipped} skipped`));
    if (overwritten) parts.push(s.cyan(`${overwritten} overwritten`));
    console.log(`\n  ${parts.join(s.dim(" · "))}`);
  }
  console.log(`  ${s.dim("→")} ${relative(cwd(), dest) || dest}\n`);
}

function parseArgs(args) {
  const opts = { force: false, all: false };
  let cmd = null;
  let posArg = null;

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "-V" || a === "--version") {
      console.log(VERSION);
      exit(0);
    }
    if (a === "-h" || a === "--help") {
      printHelp();
      exit(0);
    }
    if (a === "-f" || a === "--force") {
      opts.force = true;
      continue;
    }
    if (a === "-a" || a === "--all") {
      opts.all = true;
      continue;
    }
    if (a.startsWith("-")) error(`Unknown flag: ${a}`);
    if (!cmd) {
      cmd = a;
      continue;
    }
    if (!posArg) {
      posArg = a;
      continue;
    }
    error(`Unexpected argument: ${a}`);
  }

  return { cmd, posArg, opts };
}

const { cmd, posArg, opts } = parseArgs(argv.slice(2));

if (!cmd) {
  printHelp();
  exit(0);
}
if (cmd === "list") runList();
else if (cmd === "add") runAdd(posArg, opts);
else error(`Unknown command: ${cmd}. Run \`philoset --help\`.`);
