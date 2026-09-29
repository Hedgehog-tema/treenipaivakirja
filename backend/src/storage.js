import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '..', 'data', 'treenit.json');

export async function readTreenit() {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

export async function writeTreenit(treenit) {
  const data = JSON.stringify(treenit, null, 2);
  await fs.writeFile(DATA_FILE, data, 'utf-8');
}

export async function getNextId() {
  const treenit = await readTreenit();
  if (treenit.length === 0) return 1;
  const maxId = Math.max(...treenit.map((t) => t.id));
  return maxId + 1;
}