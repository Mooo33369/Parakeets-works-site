import { business } from "@/content/site";

/** 節の見出し（トップページ・サービスの詳細ページで共通） */
export function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: string;
}) {
  return (
    <h2
      id={id}
      className="border-l-4 border-navy-800 pl-3 text-lg font-bold tracking-wide text-navy-900 sm:text-xl"
    >
      {children}
    </h2>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-navy-50">
      <p className="mx-auto max-w-3xl px-5 py-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} {business.name}
      </p>
    </footer>
  );
}
