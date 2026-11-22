import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading, SiteFooter } from "@/components/site-parts";
import {
  brandAssets,
  business,
  servicePath,
  servicesWithDetail,
  telHref,
  toMetaText,
} from "@/content/site";

// 静的出力のため、services にないページは作らない（404 にする）
export const dynamicParams = false;

export function generateStaticParams() {
  return servicesWithDetail().map(({ detail }) => ({ slug: detail.slug }));
}

function findService(slug: string) {
  const service = servicesWithDetail().find((s) => s.detail.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  const title = `${service.name}｜${business.name}`;
  const path = servicePath(service.detail);
  const description = toMetaText(service.summary);
  // サービスの画像がなければ事業者の画像を使う
  const image = service.brand?.ogImage ?? brandAssets.ogImage;
  const ogImage = {
    url: image.src,
    width: image.width,
    height: image.height,
    alt: service.brand ? service.name : business.name,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: path,
      siteName: business.name,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const linkClass =
  "text-navy-700 underline underline-offset-4 hover:text-navy-900";

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const { name, summary, url, detail, brand } = findService(slug);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-navy-900 text-white">
        <div className="mx-auto max-w-3xl px-5 pt-6 pb-12 sm:pb-14">
          <Link href="/" className="inline-block">
            {/* 静的出力のため next/image の最適化は使わない */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brandAssets.headerLogo.src}
              width={brandAssets.headerLogo.width}
              height={brandAssets.headerLogo.height}
              alt={`${business.name}（トップページへ）`}
              className="h-auto w-40 sm:w-48"
            />
          </Link>
          <p className="mt-10 text-sm tracking-[0.2em] text-navy-100">
            サービス
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-wide sm:text-3xl">
            {brand ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={brand.logoOnDark.src}
                width={brand.logoOnDark.width}
                height={brand.logoOnDark.height}
                alt={name}
                className="h-auto w-56 sm:w-72"
              />
            ) : (
              name
            )}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 whitespace-pre-line text-navy-100 sm:text-base sm:leading-8">
            {summary}
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-16 px-5 py-14 sm:py-16">
        <section aria-labelledby="overview">
          <SectionHeading id="overview">概要</SectionHeading>
          <div className="mt-6 space-y-3 text-sm leading-7 whitespace-pre-line sm:text-base sm:leading-8">
            {detail.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-6 border-t border-slate-200 text-sm sm:text-base">
            {detail.specs.map(({ label, value }) => (
              <div
                key={label}
                className="border-b border-slate-200 py-4 sm:grid sm:grid-cols-[8rem_1fr] sm:gap-4"
              >
                <dt className="font-medium text-navy-900">{label}</dt>
                <dd className="mt-1 leading-7 whitespace-pre-line sm:mt-0">
                  {value}
                </dd>
              </div>
            ))}
            {url && (
              <div className="border-b border-slate-200 py-4 sm:grid sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="font-medium text-navy-900">サイト</dt>
                <dd className="mt-1 leading-7 break-words sm:mt-0">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {url}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </section>

        <section aria-labelledby="problems">
          <SectionHeading id="problems">解決する課題</SectionHeading>
          <ul className="mt-6 list-disc space-y-2 pl-6 text-sm leading-7 whitespace-pre-line marker:text-navy-700 sm:text-base">
            {detail.problems.map((problem) => (
              <li key={problem}>{problem}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="features">
          <SectionHeading id="features">主な機能</SectionHeading>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {detail.features.map((feature) => (
              <li
                key={feature.name}
                className="rounded-md border border-slate-200 bg-navy-50 p-5"
              >
                <h3 className="font-bold text-navy-900">{feature.name}</h3>
                <p className="mt-2 text-sm leading-7 whitespace-pre-line">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {detail.screenshots.length > 0 && (
          <section aria-labelledby="screenshots">
            <SectionHeading id="screenshots">画面イメージ</SectionHeading>
            <div className="mt-6 space-y-8">
              {detail.screenshots.map((shot) => (
                <figure key={shot.src}>
                  {/* 静的出力のため next/image の最適化は使わない */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt={shot.alt}
                    loading="lazy"
                    className="h-auto w-full rounded-md border border-slate-200"
                  />
                  <figcaption className="mt-2 text-sm whitespace-pre-line text-slate-600">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="pricing">
          <SectionHeading id="pricing">料金</SectionHeading>
          <dl className="mt-6 border-t border-slate-200 text-sm sm:text-base">
            {detail.pricing.items.map(({ label, value }) => (
              <div
                key={label}
                className="border-b border-slate-200 py-4 sm:grid sm:grid-cols-[8rem_1fr] sm:gap-4"
              >
                <dt className="font-medium text-navy-900">{label}</dt>
                <dd className="mt-1 leading-7 whitespace-pre-line sm:mt-0">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          {detail.pricing.notes.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm whitespace-pre-line text-slate-600">
              {detail.pricing.notes.map((note) => (
                <li key={note}>※ {note}</li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="flow">
          <SectionHeading id="flow">導入の流れ</SectionHeading>
          <ol className="mt-6 space-y-4">
            {detail.flow.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <div className="pt-0.5">
                  <h3 className="font-bold text-navy-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-7 whitespace-pre-line">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {detail.roadmap.length > 0 && (
          <section aria-labelledby="roadmap">
            <SectionHeading id="roadmap">今後の予定</SectionHeading>
            <p className="mt-6 text-sm leading-7 sm:text-base">
              次の機能を、追加機能として提供する予定です。
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm leading-7 whitespace-pre-line marker:text-navy-700 sm:text-base">
              {detail.roadmap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="contact">
          <SectionHeading id="contact">お問い合わせ</SectionHeading>
          <p className="mt-6 text-sm leading-7 sm:text-base">
            {name}
            の導入・お見積りのご相談は、メールまたはお電話でお問い合わせください。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${business.email}?subject=${encodeURIComponent(`${name}について`)}`}
              className="inline-flex items-center justify-center rounded-md bg-navy-800 px-5 py-3 text-sm font-medium text-white hover:bg-navy-900"
            >
              メールで問い合わせる
            </a>
            <a
              href={telHref(business.phone)}
              className="inline-flex items-center justify-center rounded-md border border-navy-800 px-5 py-3 text-sm font-medium text-navy-800 hover:bg-navy-50"
            >
              電話する（{business.phone}）
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            メール: {business.email}
          </p>
        </section>

        <p className="text-sm">
          <Link href="/" className={linkClass}>
            {business.name} のトップページへ戻る
          </Link>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
