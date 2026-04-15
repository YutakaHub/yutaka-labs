import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const LOCAL_ENV_PATH = join(process.cwd(), 'config', 'local.env')

type EnvMap = Map<string, string>

function parseLocalEnvFile(filePath: string): EnvMap {
  const content = readFileSync(filePath, 'utf-8')
  const envMap: EnvMap = new Map()

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()

    // 空行とコメント行はスキップする
    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')
    if (separatorIndex <= 0) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (!key) {
      continue
    }

    envMap.set(key, value)
  }

  return envMap
}

export function getServerEnv(key: string): string | undefined {
  // ローカル実行時は config/local.env を優先し、未設定時は環境変数へフォールバックする
  if (existsSync(LOCAL_ENV_PATH)) {
    const fileEnv = parseLocalEnvFile(LOCAL_ENV_PATH)
    const valueFromFile = fileEnv.get(key)

    if (valueFromFile) {
      return valueFromFile
    }
  }

  return process.env[key]
}
