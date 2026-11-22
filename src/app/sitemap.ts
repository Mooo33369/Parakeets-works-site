import type { MetadataRoute } from "next";

import { SITE_URL, servicePath, servicesWithDetail } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    ...servicesWithDetail().map(({ detail }) => ({
      url: `${SITE_URL}${servicePath(detail)}`,
    })),
  ];
}
