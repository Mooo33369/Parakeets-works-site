# Parakeets works 事業サイト

屋号「Parakeets works」の事業サイト（1ページ）。https://parakeets-works.jp で公開する。
銀行口座の審査や取引先に事業の実態を示すためのサイトで、集客は目的にしない。

## 構成

Next.js 16（App Router・静的出力 `output: "export"`）/ React 19 / TypeScript / Tailwind CSS v4 / pnpm / Vercel。
RisshoCloud と同じ構成にしている。データベース・認証・問い合わせフォーム・アクセス解析・Cookie は使わない。

| ファイル | 内容 |
|---|---|
| `src/content/site.ts` | 掲載内容（屋号・所在地・連絡先）とサービスの一覧。**文言の変更はここだけ** |
| `src/app/page.tsx` | ページ本体 |
| `src/app/layout.tsx` | `<title>`・meta description・OGP |
| `src/app/opengraph-image.tsx` | 共有したときの画像（ビルド時に PNG を出力） |
| `src/app/icon.svg` / `apple-icon.tsx` | favicon / iPhone 用アイコン |
| `vercel.json` | www → ルートのリダイレクト、OGP 画像の Content-Type |

### サービスを追加する

`src/content/site.ts` の `services` に要素を足す。`url` を省略すると「サイトは準備中です」と表示され、入れるとリンクになる。

```ts
{ name: "立哨クラウド", summary: "…", url: "https://example.jp" },
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
