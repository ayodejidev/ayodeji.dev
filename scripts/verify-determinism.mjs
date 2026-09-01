import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { spawn } from 'node:child_process';

const projectRoot = new URL('../', import.meta.url);
const temporaryRoot = await mkdtemp(join(tmpdir(), 'ayodeji-astro-determinism-'));
const builds = [join(temporaryRoot, 'first'), join(temporaryRoot, 'second')];

function build(outputDirectory) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(
      process.execPath,
      ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', outputDirectory],
      { cwd: projectRoot, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, stdio: 'inherit' },
    );
    childProcess.once('error', reject);
    childProcess.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`Astro build exited with status ${code}`)));
  });
}

async function manifest(directory) {
  const output = new Map();

  async function visit(current) {
    const entries = await readdir(current, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
      } else {
        const contents = await readFile(path);
        output.set(relative(directory, path), createHash('sha256').update(contents).digest('hex'));
      }
    }
  }

  await visit(directory);
  return output;
}

try {
  await build(builds[0]);
  await build(builds[1]);
  assert.deepEqual([...await manifest(builds[0])], [...await manifest(builds[1])]);
  console.log('Verified two production builds are byte-for-byte deterministic.');
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
