import { business, services, telHref } from "@/content/site";

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="border-l-4 border-navy-800 pl-3 text-lg font-bold tracking-wide text-navy-900 sm:text-xl"
    >
      {children}
    </h2>
  );
}

export default function Home() {
  const profile: { label: string; value: React.ReactNode }[] = [
    { label: "屋号", value: business.name },
    { label: "代表者", value: business.representative },
    {
      label: "所在地",
      value: (
        <>
          {business.postalCode}
          <br />
          {business.address}
          <br />
          {business.building}
        </>
      ),
    },
    { label: "開業", value: business.founded },
    {
      label: "事業内容",
      value: (
        <ul className="space-y-1">
          {business.activities.map((activity) => (
            <li key={activity}>{activity}</li>
          ))}
        </ul>
      ),
    },
    {
      label: "メール",
      value: (
        <a
          href={`mailto:${business.email}`}
          className="text-navy-700 underline underline-offset-4 hover:text-navy-900"
        >
          {business.email}
        </a>
      ),
    },
    {
      label: "電話番号",
      value: (
        <a
          href={telHref(business.phone)}
          className="text-navy-700 underline underline-offset-4 hover:text-navy-900"
        >
          {business.phone}
        </a>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-navy-900 text-white">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
          <p className="text-sm tracking-[0.2em] text-navy-100">
            業務システムの開発・提供
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-wide sm:text-4xl">
            {business.name}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-navy-100 sm:text-base sm:leading-8">
            {business.description}
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-16 px-5 py-14 sm:py-16">
        <section aria-labelledby="services">
          <SectionHeading id="services">サービス</SectionHeading>
          <ul className="mt-6 space-y-4">
            {services.map((service) => (
              <li
                key={service.name}
                className="rounded-md border border-slate-200 bg-navy-50 p-5 sm:p-6"
              >
                <h3 className="text-base font-bold text-navy-900 sm:text-lg">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-7 sm:text-base">
                  {service.summary}
                </p>
                <p className="mt-4 text-sm">
                  {service.url ? (
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-navy-700 underline underline-offset-4 hover:text-navy-900"
                    >
                      {service.name}のサイトを見る
                    </a>
                  ) : (
                    <span className="text-slate-500">サイトは準備中です</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="profile">
          <SectionHeading id="profile">事業者情報</SectionHeading>
          <dl className="mt-6 border-t border-slate-200 text-sm sm:text-base">
            {profile.map(({ label, value }) => (
              <div
                key={label}
                className="border-b border-slate-200 py-4 sm:grid sm:grid-cols-[8rem_1fr] sm:gap-4"
              >
                <dt className="font-medium text-navy-900">{label}</dt>
                <dd className="mt-1 leading-7 break-words sm:mt-0">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="contact">
          <SectionHeading id="contact">お問い合わせ</SectionHeading>
          <p className="mt-6 text-sm leading-7 sm:text-base">
            ご用件は、メールまたはお電話でお問い合わせください。
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${business.email}`}
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
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-navy-50">
        <p className="mx-auto max-w-3xl px-5 py-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} {business.name}
        </p>
      </footer>
    </div>
  );
}
