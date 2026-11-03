import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // データベースも認証も使わない1ページのサイトなので、静的なファイル（out/）に出力する
  output: "export",
};

export default nextConfig;
