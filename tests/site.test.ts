import { describe, expect, it } from "vitest";

import { business, services, telHref } from "@/content/site";

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

  it("電話番号を tel: リンクにする", () => {
    expect(telHref("070-3865-4918")).toBe("tel:07038654918");
  });
});
