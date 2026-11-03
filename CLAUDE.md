# CLAUDE.md

Parakeets works の事業サイト（1ページ・静的出力）。公開先は https://parakeets-works.jp（Vercel）。詳細は README.md。

技術: Next.js 16（App Router・`output: "export"`）/ React 19 / TypeScript / Tailwind CSS v4 / pnpm / Vitest / Vercel

Next.js 16 は学習データと API が異なる場合がある。Next.js の機能を使う前に `node_modules/next/dist/docs/` の該当ガイドを確認する。

## コマンド
- `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build` を作業完了前に必ず通す
- `pnpm format` で整形する

## 守るルール
- 掲載内容は `src/content/site.ts` にだけ書く。ページに文言や連絡先を直接書かない。サービスは `services` 配列から表示する
- 静的出力のままにする。サーバーが必要な機能（Server Action・リクエスト時の処理・`next/image` の最適化）は使わない。メタデータのルート（画像など）には `export const dynamic = "force-static"` を付ける
- 問い合わせフォーム・アクセス解析・Cookie を入れない（プライバシーポリシーを置かない前提のため）
- デザインは紺系・1カラム・装飾は少なめ。色は `globals.css` の `navy-*` を使う
- DNS を変更する手順を書くときは、メール用の MX・SPF・DKIM・DMARC に触れないことを明記する
