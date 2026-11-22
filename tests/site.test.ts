import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  brandAssets,
  business,
  servicePath,
  services,
  servicesWithDetail,
  telHref,
  toMetaText,
} from "@/content/site";

describe("サイトの内容", () => {
  it("Issue の掲載内容がそろっている", () => {
    expect(business.name).toBe("Parakeets works");
    expect(business.representative).toBe("野田　真也");
    expect(business.postalCode).toBe("〒530-0001");
    expect(business.email).toBe("info@parakeets-works.jp");
    expect(business.phone).toBe("070-3865-4918");
    expect(business.founded).toBe("2026年11月");
    expect(business.activities).toContain("業務システムの開発・提供");
    expect(services.map((s) => s.name)).toContain("立哨クラウド");
  });

  it("サービスの URL は https で始まる（設定されている場合）", () => {
    for (const service of services) {
      if (service.url) expect(service.url).toMatch(/^https:\/\//);
    }
  });

  it("ロゴと共有用の画像が public/ にある", () => {
    for (const asset of Object.values(brandAssets)) {
      expect(asset.src).toMatch(/^\//);
      expect(existsSync(join(process.cwd(), "public", asset.src))).toBe(true);
    }
  });

  it("事業の説明文は提供開始の時期を示す（開発中の表現を残さない）", () => {
    expect(business.description).toContain("立哨クラウド");
    expect(business.description).toContain("2027年1月");
    expect(business.description).not.toContain("開発を進めています");
  });

  it("メタデータ用の文言から改行を取り除く", () => {
    expect(toMetaText("1文目です。\n2文目です。")).toBe(
      "1文目です。2文目です。",
    );
    expect(toMetaText("1文目です。 \n  2文目です。\n")).toBe(
      "1文目です。2文目です。",
    );
    expect(toMetaText(business.description)).not.toContain("\n");
  });

  it("電話番号を tel: リンクにする", () => {
    expect(telHref("070-3865-4918")).toBe("tel:07038654918");
  });
});

describe("サービスの詳細ページ", () => {
  const risshoCloud = services.find((s) => s.name === "立哨クラウド");

  it("立哨クラウドのページは /services/risshocloud", () => {
    expect(risshoCloud?.detail).toBeDefined();
    expect(servicePath(risshoCloud!.detail!)).toBe("/services/risshocloud");
  });

  it("Issue #4 の料金・支払い方法が載っている", () => {
    const pricing = Object.fromEntries(
      risshoCloud!.detail!.pricing.items.map(({ label, value }) => [
        label,
        value,
      ]),
    );
    expect(pricing["初期費用"]).toBe("0円");
    expect(pricing["月額利用料"]).toBe("5,000円（税別）");
    expect(pricing["無料お試し"]).toContain("30日間");
    expect(pricing["お支払い方法"]).toBe("請求書による銀行振込");
  });

  it("機能・導入の流れ・今後の予定がそろっている", () => {
    const detail = risshoCloud!.detail!;
    expect(detail.features.map((f) => f.name)).toEqual(
      expect.arrayContaining(["シフト作成", "配置のチェック", "隊員への公開"]),
    );
    expect(detail.flow.map((f) => f.title)).toEqual([
      "お問い合わせ・ヒアリング",
      "お見積り・お申し込み",
      "初期設定",
      "無料お試し（30日間）",
      "本契約・利用開始",
    ]);
    expect(detail.roadmap.length).toBeGreaterThan(0);
  });

  it("slug は英小文字・数字・ハイフンだけで、重複しない", () => {
    const slugs = servicesWithDetail().map(({ detail }) => detail.slug);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("立哨クラウドのロゴ・アイコン・共有用の画像が public/brand/risshocloud/ にある", () => {
    const brand = risshoCloud?.brand;
    expect(brand).toBeDefined();
    for (const asset of Object.values(brand!)) {
      expect(asset.src).toMatch(/^\/brand\/risshocloud\//);
      expect(existsSync(join(process.cwd(), "public", asset.src))).toBe(true);
    }
    expect(brand!.ogImage).toMatchObject({ width: 1200, height: 630 });
  });

  it("立哨クラウドの画面イメージが2枚以上あり、サンプルデータだと注記している", () => {
    const detail = risshoCloud!.detail!;
    expect(detail.screenshots.length).toBeGreaterThanOrEqual(2);
    expect(detail.screenshotsNote).toContain("サンプル");
  });

  it("画面イメージの画像が public/ にある", () => {
    for (const { detail } of servicesWithDetail()) {
      for (const shot of detail.screenshots) {
        expect(shot.src).toMatch(/^\//);
        expect(shot.alt).not.toBe("");
        expect(existsSync(join(process.cwd(), "public", shot.src))).toBe(true);
      }
    }
  });
});
