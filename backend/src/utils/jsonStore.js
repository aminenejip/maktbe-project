import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'data')

export const readJSON = (file) =>
  fs.readFile(path.join(DATA_DIR, file), 'utf-8').then(JSON.parse)

export const writeJSON = (file, data) =>
  fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf-8')
