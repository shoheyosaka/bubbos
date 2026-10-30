# smz-web

小規模事業者向けホームページのテンプレートです。CSS と JavaScript を埋め込んだ 1 枚の `index.html` をビルドし、GitHub Pages（確認用）や Cloudflare Pages（本番）で公開します。

案件の進め方（ヒアリング、契約、デザイン案、公開、保守）は「[ホームページ制作 案件フロー](https://claude.ai/artifact/5TysQ6QdM3MyUcaAd9MQpw)」にまとめています。

## 新しい案件の始め方

1. GitHub でこのリポジトリを開き、「Use this template」→「Create a new repository」で案件用のリポジトリを作る
2. 手元に clone して `npm install`
3. 下の「案件ごとに変えるもの」を順に直す
4. `npm run dev` で確認しながら `src/` を作り込む

### 案件ごとに変えるもの

- `package.json` の `name` と `description`
- `src/styles.css` の `@theme`（色とフォント）
- `src/index.html` の `TODO`（`grep -n TODO src/index.html` で一覧が出ます）
- `assets/` にロゴ・ファビコン・写真を置く
- この README（タイトル、説明、色の表、公開先）

## フォルダ構成

```
src/                 ソース（ここを編集する）
  index.html         ページ本体。CSS・JS の差し込み位置に目印がある
  styles.css         Tailwind CSS の設定（色・フォント）と独自の CSS
  main.js            メニュー開閉・よくある質問・スクロール表示
assets/              画像
drafts/              （任意）検討用のデザイン案。あればそのまま dist/ にコピーされる
scripts/build.mjs    dist/ を作るスクリプト
dist/                公開用ファイル（ビルドで生成。git には含めない）
```

## コマンド

Node.js 20 以上が必要です（`.node-version` は 22）。

| コマンド | 内容 |
| --- | --- |
| `npm install` | 初回だけ。Tailwind CSS を入れる |
| `npm run dev` | 保存するたびに `dist/` を作り直す。`dist/index.html` をブラウザで開いて確認する |
| `npm run build` | `dist/` を一度だけ作る |

- 見た目は Tailwind CSS のクラスで書きます。ビルド時に、`src/index.html` と `src/main.js` で使っているクラスだけを CSS にして埋め込みます
- `src/index.html` をそのまま開くと CSS が当たっていません。確認は必ず `dist/` で行います

## 色

色は `src/styles.css` の `@theme` で決めています。HTML では `bg-accent`、`text-ink` のように名前で使うので、`@theme` を変えればまとめて変わります。

| 名前 | 用途 | 初期値 |
| --- | --- | --- |
| `ink` | メインの文字・濃い面 | `#1F2937` |
| `muted` | 補助の文字 | `#6B7280` |
| `accent` | アクセント（ボタン・下線・番号など） | `#2563EB` |
| `on-accent` | アクセントの上に置く文字 | `#FFFFFF` |
| `line` | 枠線・区切り線 | `#E5E7EB` |
| `surface` | 淡い面（交互の背景・仮の画像） | `#F3F4F6` |
| `page` | ページの背景 | `#FFFFFF` |

## よく使う仕組み

- **よくある質問の開閉**：`data-faq-group` の中の `data-faq-item` が 1 問。最初の 1 つだけ開いた状態にしておく
- **スクロールで表示**：`section` の中の `.reveal-group` の子要素が、画面に入るとふわっと出てくる。`#top` は対象外。端末で「視差効果を減らす」を設定している人には動かさない
- **モバイルメニュー**：`data-menu-root` の中の `data-menu-toggle` ボタンで `data-menu` を開閉する

## 公開

ビルドコマンドは `npm run build`、公開するフォルダは `dist` です。

### GitHub Pages（確認用）

`main` に push すると GitHub Actions（`.github/workflows/pages.yml`）がビルドします。GitHub Pages への公開は、次の 2 つを設定したときだけ行われます（設定するまでは、ビルドが通るかのチェックだけが動きます）。

1. Settings → Pages → Source を「GitHub Actions」にする
2. Settings → Secrets and variables → Actions → Variables に `DEPLOY_PAGES` を作り、値を `true` にする

- 非公開リポジトリで GitHub Pages を使うには、GitHub の有料プラン（Pro など）が必要です。無料プランなら、確認用のリポジトリを公開にするか、Cloudflare Pages の確認用URLを使います

### Cloudflare Pages（本番）

お客様名義の Cloudflare でリポジトリを接続し、次のように設定します。

- Build command：`npm run build`
- Build output directory：`dist`

## 公開前チェックリスト

- [ ] `<meta name="robots" content="noindex">` を外す
- [ ] `src/index.html` に `TODO` が残っていない
- [ ] 仮のリンク（`#`）やダミーのメールアドレスが残っていない
- [ ] 仮の画像の枠、仮の口コミが残っていない
- [ ] タイトル・説明文・ファビコン・コピーライトの年
- [ ] 実際のスマホ（iPhone と Android）で全体を見た
