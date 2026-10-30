# bubbos

ブッボス（BUBBOSU）のホームページです。キャッチコピーは「地球がアトラクション。」。

- 最終案（`src/`）が公開するページです。CSS と JavaScript を埋め込んだ 1 枚の `index.html` にビルドします
- 案A〜C（`drafts/`）は検討用のデザイン案です。本番には公開しません。`npm run dev` か `npm run build:drafts` でビルドすると `dist/a.html` などができ、ヘッダーの切り替えボタン（調整案／案A／案B／案C）で行き来できます。「調整案」は最終案（`src/`）のことです。最終案のページに置いた切り替えボタンは案A〜C込みのビルドだけに出て、`npm run build`（本番）では自動で消えます
- もとは React（App.tsx と CSS）で作られたデザインを、HTML / CSS / JavaScript だけで書き直したものです。3D の作品リングは React 部品の代わりに `src/main.js` で作り直しています

## デザイン案

| ファイル | 名前 | 内容 |
| --- | --- | --- |
| `drafts/a.html` | 案A「夜の宇宙ジャングル」 | いただいたデザインをもとに軽くした案（紺の夜空 × 黄色。カーソル演出なし、扉はレールなしでランダムに並べる） |
| `drafts/b.html` | 案B「亜空間」 | 案A・案Cとはレイアウトから別の独立したデザイン。黒い虚空にシアンと紫の光、計器風のラベル。星のワープ、標本アーカイブ、光のゲートと未知の信号、横に流れる断片 |
| `drafts/c.html` | 案C「余白」 | シンプルで洗練された独立デザイン。生成りの白と墨の黒、明朝体、細い線と広い余白。縦書きの入口、整然とした作品一覧、開閉式の活動リスト、ひとつずつ読む「ことば」 |
| `src/index.html` | 最終案（画面上の名前は「調整案」） | 案Aをベースに、案Bのような動きを足した案。トップは背景の絵だけ残し、地球が軸の観覧車・入場チケット・小さな惑星に置き換え。入口の星のワープ、見出しのグリッチ、COSMOS の言葉が浮かぶ宇宙（スクロールで奥へ進む）、活動は「闇に浮かぶ光の扉」（手前の4つの扉が開くと光があふれ、地平線の遠くの扉にはひとことが眠る）、考え方は絵を使わず「回る地球儀と、触れて遊べる見出しの文字」、スクロールでぼかしから浮かび上がる表示、右端のスクロール計器、ギャラリー正面の光の筋、星の回転 |

案Aは `a.html`＋`css/style.css`＋`js/main.js` で完結しています（もとは最終案から書き出したもの。最終案を空にしたので、今は案A側にだけ残っています）。案Bと案Cはそれぞれ `b.html`＋`css/b.css`＋`js/b.js`、`c.html`＋`css/c.css`＋`js/c.js` だけで完結する別デザインです（文章のデータはそれぞれの JS の中に持っています）。

## フォルダ構成

```
src/                 最終案のソース（ここを編集する）
  index.html         ページ本体。CSS・JS の差し込み位置に目印がある
  styles.css         Tailwind の初期化と、サイトの CSS（ほぼ素の CSS）
  main.js            ページの動き（メニュー・作品リング・活動の扉・紙芝居・作品の拡大表示と、調整案で足した動き）
assets/              画像（最終案・案A〜Cで共通）
public/              robots.txt・404.html（そのまま dist/ の直下にコピーする）
drafts/              案A〜C（--drafts を付けたときだけ dist/ にコピーする）
  css/style.css      案Aの CSS
  css/b.css・js/b.js 案B（亜空間）専用の CSS と JS
  css/c.css・js/c.js 案C（余白）専用の CSS と JS
  js/main.js         案Aの JS
scripts/build.mjs    dist/ を作るスクリプト
dist/                公開用ファイル（ビルドで生成。git には含めない）
```

## コマンド

Node.js 20 以上が必要です（`.node-version` は 22）。

| コマンド | 内容 |
| --- | --- |
| `npm install` | 初回だけ |
| `npm run dev` | 保存するたびに `dist/` を作り直す（案A〜Cも入る）。`open dist/index.html` で確認 |
| `npm run build` | 本番用。最終案だけの `dist/` を作る |
| `npm run build:drafts` | 案A〜Cも入れた `dist/` を作る（確認用） |

- `src/index.html` をそのまま開くと CSS が当たっていません。確認は必ず `dist/` で行います
- 案A〜Cは完成済みの HTML です。最終案を直しても案A〜Cには反映されません（記録として残すため）

## 画像と文章の差し替え

- 作品画像は `assets/art-*.jpg`（全案で共通）
- 調整案（最終案）の文章は `src/main.js` の `storyPages`（紙芝居）、`attractionDetails`（活動のゲート）、`doorWords`（遠くの扉のひとこと）、`cosmosWords`（COSMOS に浮かぶ言葉）
- 案A〜Cの文章は、それぞれの案の JS に入っています（案A `drafts/js/main.js`、案B `drafts/js/b.js`、案C `drafts/js/c.js`）。調整案を直しても案A〜Cには反映されません

## 公開

- **確認用（GitHub Pages）**：`main` に push すると GitHub Actions が `npm run build:drafts` でビルドします。公開するには Settings → Pages → Source を「GitHub Actions」にし、Actions の Variables に `DEPLOY_PAGES=true` を作ります
- **本番（Cloudflare Pages）**：Build command は `npm run build`、Build output directory は `dist`

## 公開前チェックリスト

- [ ] `<meta name="robots" content="noindex">` を外す
- [ ] `grep -n TODO src/index.html` で残りがない（ファビコン、問い合わせ先、作品情報、仮テキスト）
- [ ] 作品モーダルの「作品情報をここに表示」を正式な情報にする
- [ ] 「活動について問い合わせる」ボタンのリンク先を決める
- [ ] 独自ドメインが決まったら `public/robots.txt` に Sitemap を足す
- [ ] 実際のスマホ（iPhone と Android）で全体を見た
