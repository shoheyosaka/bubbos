// 公開用ファイル（dist/）を作るスクリプト
//
//   npm run build  … dist/ を作り直す
//   npm run dev    … ファイルを保存するたびに dist/ を作り直す（案A〜Cも入れる）
//   --drafts を付けると、案A〜C（drafts/）も dist/ に入れる（本番には入れない）
//
// 最終案は src/ のソースから、CSS と JS を埋め込んだ 1 枚の index.html を作る。
// 画像（assets/）と、robots.txt・404.html など（public/）はそのままコピーする。
import { spawnSync } from "node:child_process"
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, watch, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const src = join(root, "src")
const dist = join(root, "dist")
const tailwindCli = join(root, "node_modules", "@tailwindcss", "cli", "dist", "index.mjs")

const CSS_MARK = /<!-- build:css[^>]*-->/
const JS_MARK = /<!-- build:js[^>]*-->/
const DRAFTS_BLOCK = /[ \t]*<!-- drafts:start[\s\S]*?<!-- drafts:end -->\n?/g
const withDrafts = process.argv.includes("--drafts")

function compileCss() {
  const result = spawnSync(
    process.execPath,
    [tailwindCli, "--input", join(src, "styles.css"), "--minify"],
    { cwd: root, encoding: "utf8" },
  )
  if (result.status !== 0) throw new Error(`Tailwind のビルドに失敗しました\n${result.stderr}`)
  // 先頭のライセンスコメントは省く
  return result.stdout.replace(/^\/\*!.*?\*\/\s*/s, "").trim()
}

function build() {
  const started = Date.now()
  let html = readFileSync(join(src, "index.html"), "utf8")
  if (!CSS_MARK.test(html) || !JS_MARK.test(html)) {
    throw new Error("src/index.html に <!-- build:css --> と <!-- build:js --> の目印が必要です")
  }

  // 本番では案A〜Cへの切り替えを消す（リンク先が dist/ に入らないため）
  if (!withDrafts) html = html.replace(DRAFTS_BLOCK, "")

  const css = compileCss()
  const js = readFileSync(join(src, "main.js"), "utf8").trimEnd()
  html = html
    .replace(CSS_MARK, () => `<style>\n${css}\n</style>`)
    .replace(JS_MARK, () => `<script>\n${js}\n</script>`)

  rmSync(dist, { recursive: true, force: true })
  mkdirSync(dist, { recursive: true })
  writeFileSync(join(dist, "index.html"), html)
  cpSync(join(root, "assets"), join(dist, "assets"), { recursive: true })
  if (existsSync(join(root, "public"))) cpSync(join(root, "public"), dist, { recursive: true })
  if (withDrafts) cpSync(join(root, "drafts"), dist, { recursive: true })

  console.log(`dist/ を作成しました（${Date.now() - started}ms）`)
}

build()

if (process.argv.includes("--watch")) {
  console.log("変更を監視しています（終了は Ctrl+C）")
  let timer
  const rebuild = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      try {
        build()
      } catch (error) {
        console.error(error.message)
      }
    }, 100)
  }
  for (const dir of ["src", "assets", "public", "drafts"]) {
    if (existsSync(join(root, dir))) watch(join(root, dir), { recursive: true }, rebuild)
  }
}
