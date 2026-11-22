# Parakeets works 事業サイト

屋号「Parakeets works」の事業サイト（1ページ）。https://parakeets-works.jp で公開する。
銀行口座の審査や取引先に事業の実態を示すためのサイトで、集客は目的にしない。

## 構成

Next.js 16（App Router・静的出力 `output: "export"`）/ React 19 / TypeScript / Tailwind CSS v4 / pnpm / Vercel。
RisshoCloud と同じ構成にしている。データベース・認証・問い合わせフォーム・アクセス解析・Cookie は使わない。

| ファイル | 内容 |
|---|---|
| `src/content/site.ts` | 掲載内容（屋号・所在地・連絡先）とサービスの一覧、ロゴ・OGP 画像のパス。**文言の変更はここだけ** |
| `src/app/page.tsx` | トップページ |
| `src/app/services/[slug]/page.tsx` | サービスの詳細ページ（`services` の `detail` から作る。例: `/services/risshocloud`） |
| `src/components/site-parts.tsx` | 節の見出し・フッター（両ページで共通） |
| `src/app/layout.tsx` | `<title>`・meta description・OGP |
| `public/logo-white.svg` | ヘッダーのロゴ（紺の背景用の白抜き横組み） |
| `public/ogp.png` | 共有したときの画像（1200×630） |
| `src/app/icon.svg` / `favicon.ico` / `apple-icon.png` | タブのアイコン / 古いブラウザ用 / iPhone 用アイコン（180px） |
| `public/brand/risshocloud/` | 立哨クラウドの白抜きロゴ（詳細ページの見出し）・アプリアイコン（トップページのサービス欄）・共有用の画像（詳細ページ）。元の素材は RisshoCloud リポジトリの `docs/brand/rissho-cloud_logo_kit/`。パスは `services` の `brand` |
| `brand/` | ロゴキットの元素材一式（Issue #3 の添付）。サイトには上の複製だけを出す |
| `vercel.json` | www → ルートのリダイレクト |

### ロゴ・アイコンを差し替える

`brand/` の素材を更新し、使う分を上の表の場所に同じ名前でコピーする。ファイル名を変えるときは `src/content/site.ts` の `brandAssets` も直す。

### サービスを追加する

`src/content/site.ts` の `services` に要素を足す。`url` を入れるとサービスのサイトへのリンクになる。
`detail` を入れると `/services/{slug}` に詳細ページ（概要・課題・機能・料金・導入の流れ・画面イメージ・今後の予定・お問い合わせ）ができ、トップページからリンクされ、sitemap にも載る。`url` も `detail` もないときは「サイトは準備中です」と表示する。

```ts
{ name: "立哨クラウド", summary: "…", url: "https://example.jp", detail: { slug: "risshocloud", … } },
```

### 文言を途中で改行する

`src/content/site.ts` の文言に `\n` を入れると、ページではその位置で改行する。meta description・OGP の説明文では改行を取り除く（`toMetaText`）。

```ts
description: "1文目です。\n2文目です。",
```

### 画面イメージを追加する

1. キャプチャを `public/screenshots/{slug}/` に置く（例: `public/screenshots/risshocloud/shift.png`。幅 1280px 程度の PNG）
2. `src/content/site.ts` の `detail.screenshots` に足す。空のあいだは「画面イメージ」の節を表示しない

```ts
screenshots: [
  { src: "/screenshots/risshocloud/shift.png", alt: "シフト作成画面", width: 1280, height: 800, caption: "シフト作成画面" },
],
```

## コマンド

| コマンド | 内容 |
|---|---|
| `pnpm dev` | 開発サーバー（http://localhost:3000） |
| `pnpm lint` / `pnpm typecheck` / `pnpm test` | 作業完了前に通す |
| `pnpm build` | `out/` に静的ファイルを出力 |
| `pnpm format` | Prettier で整形 |

## 公開の手順（Vercel）

1. Vercel の既存の Pro チームで **Add New → Project** からこのリポジトリを取り込む（Framework は Next.js のまま。設定の変更は不要）
2. Project → Settings → Domains で `parakeets-works.jp` を追加する
3. 続けて `www.parakeets-works.jp` を追加し、**Redirect to `parakeets-works.jp`（308）** を選ぶ（`vercel.json` にも同じリダイレクトを入れてある）
4. Vercel の画面に表示される値で DNS にレコードを追加する（下記）

### DNS の注意

メール用の **MX・SPF（TXT）・DKIM・DMARC のレコードは削除・上書きしない**。追加するのは次の 2 つだけ。

| 種類 | 名前 | 値 |
|---|---|---|
| A | `@`（apex） | Vercel の画面に表示される IP（例: `76.76.21.21`） |
| CNAME | `www` | Vercel の画面に表示される値（例: `cname.vercel-dns.com`） |

- apex にすでに A レコードがある場合は、それを置き換える（MX や TXT には触れない）
- ネームサーバーを Vercel に切り替える方式は使わない（メールのレコードが引き継がれないため）

### 公開後の確認（Issue #1 の受け入れ条件）

- [ ] https://parakeets-works.jp が HTTPS で表示される
- [ ] https://www.parakeets-works.jp が https://parakeets-works.jp にリダイレクトされる
- [ ] Android Chrome で表示が崩れない
- [ ] メール・電話のリンクが動く（立哨クラウドは URL を入れたらリンクを確認する）
- [ ] LINE で URL を送り、画像と説明文が表示される（キャッシュが残るときは URL の末尾に `?v=1` を付けて試す）
- [ ] info@ と support@ でメールを送受信できる（外部のアドレスとの往復で確認する）
