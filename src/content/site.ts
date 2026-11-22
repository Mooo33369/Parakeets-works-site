/**
 * サイトに載せる内容。文言の変更やサービスの追加は、このファイルだけを編集すればよい。
 * 文言の途中で改行したいときは \n を入れる（ページではその位置で改行し、メタデータでは取り除く）
 */

export const SITE_URL = "https://parakeets-works.jp";

export const business = {
  name: "Parakeets works",
  representative: "野田　真也",
  postalCode: "〒530-0001",
  address: "大阪府大阪市北区梅田１丁目１番３号",
  building: "大阪駅前第３ビル１１階２号室",
  email: "info@parakeets-works.jp",
  phone: "070-3865-4918",
  founded: "2026年11月",
  /** 事業の内容。サービスが増えても書き換えずに済むよう、分野で書く */
  activities: ["業務システムの開発・提供"],
  description:
    "Parakeets works は、業務システムの開発・提供を行う事業者です。\n警備会社向けのシフト作成サービス「立哨クラウド」の提供を2027年1月から開始します。",
} as const;

/**
 * ロゴと共有用の画像。ファイルは public/ に置き、元の素材一式は brand/ にある。
 * width・height は画像の縦横比（表示サイズは CSS で決める）
 */
export const brandAssets = {
  /** ヘッダー（紺の背景）に出す白抜きの横組みロゴ */
  headerLogo: { src: "/logo-white.svg", width: 530, height: 124 },
  /** LINE などで共有したときに出る画像 */
  ogImage: { src: "/ogp.png", width: 1200, height: 630 },
} as const;

/** 画像ファイル。src は public/ からのパス。width・height は縦横比（表示サイズは CSS で決める） */
export type ImageAsset = { src: string; width: number; height: number };

/**
 * サービスのロゴ・アイコン。ファイルは public/brand/{slug}/ に置く。
 * 元の素材一式はサービスのリポジトリにある（立哨クラウドは RisshoCloud の docs/brand/rissho-cloud_logo_kit/）
 */
export type ServiceBrand = {
  /** 詳細ページの見出し（紺の背景）に出す白抜きの横組みロゴ */
  logoOnDark: ImageAsset;
  /** トップページのサービス欄に出すアプリアイコン */
  icon: ImageAsset;
  /** 詳細ページを LINE などで共有したときに出る画像（1200×630） */
  ogImage: ImageAsset;
};

/** サービスの詳細ページに出す画面イメージ。ファイルは public/ に置く */
export type Screenshot = {
  src: string;
  alt: string;
  /** 画像の縦横比（表示サイズは CSS で決める） */
  width: number;
  height: number;
  caption: string;
};

/** サービスの詳細ページ（/services/[slug]）に出す内容 */
export type ServiceDetail = {
  /** ページの URL に使う英小文字の名前（例: risshocloud → /services/risshocloud） */
  slug: string;
  /** 概要の本文（段落ごと） */
  overview: readonly string[];
  /** 提供形態・対象などの一覧 */
  specs: readonly { label: string; value: string }[];
  /** 解決する課題 */
  problems: readonly string[];
  features: readonly { name: string; description: string }[];
  pricing: {
    items: readonly { label: string; value: string }[];
    notes: readonly string[];
  };
  /** 導入の流れ（上から順に） */
  flow: readonly { title: string; description: string }[];
  /** 画面イメージ。空のあいだは節ごと表示しない */
  screenshots: readonly Screenshot[];
  /** 今後の予定 */
  roadmap: readonly string[];
};

export type Service = {
  name: string;
  /** 対象と内容を1〜2文で */
  summary: string;
  /** サービスのURL。まだない場合は省略する（リンクを出さず「準備中」と表示する） */
  url?: string;
  /** 詳細ページの内容。入れると /services/{slug} にページができ、トップページからリンクされる */
  detail?: ServiceDetail;
  /** ロゴ・アイコン。省略するとサービス名の文字だけを出し、共有時の画像は事業者のものを使う */
  brand?: ServiceBrand;
};

/** 提供中のサービス。追加するときは、この配列に要素を足す */
export const services: readonly Service[] = [
  {
    name: "立哨クラウド",
    summary:
      "警備会社向けのシフト作成サービスです。\n隊員の勤務可能時間をもとにシフトを作成し、隊員への共有までをまとめて行えます。",
    brand: {
      logoOnDark: {
        src: "/brand/risshocloud/logo-white.svg",
        width: 1073,
        height: 418,
      },
      icon: { src: "/brand/risshocloud/app-icon.svg", width: 512, height: 512 },
      ogImage: { src: "/brand/risshocloud/ogp.png", width: 1200, height: 630 },
    },
    detail: {
      slug: "risshocloud",
      overview: [
        "立哨クラウドは、警備会社のシフト作成・隊員への連絡・月次の集計をまとめて行えるクラウドサービス（Webアプリ）です。",
        "パソコン・スマートフォンのブラウザから利用でき、ソフトのインストールは不要です。",
      ],
      specs: [
        { label: "提供形態", value: "クラウドサービス（Webアプリ）" },
        {
          label: "動作環境",
          value: "パソコン・スマートフォンのブラウザ（インストール不要）",
        },
        {
          label: "対象",
          value: "隊員30名・現場10か所程度までの中小の警備会社",
        },
        { label: "提供開始", value: "2027年1月" },
      ],
      problems: [
        "紙や Excel でのシフト作成に時間がかかる",
        "シフトの連絡を、電話や LINE で隊員一人ひとりに送っている",
        "配置する隊員の資格を、そのつど確認している",
        "月末の勤務実績の集計に手間がかかる",
      ],
      features: [
        {
          name: "隊員・現場の名簿",
          description:
            "隊員と現場を登録・管理できます。CSV ファイルからまとめて取り込めます。",
        },
        {
          name: "勤務可能時間の管理",
          description:
            "隊員ごとに勤務できる日時を登録し、シフトの作成時に確認できます。",
        },
        {
          name: "シフト作成",
          description:
            "日勤・夜勤の枠を一括で作成でき、前日のシフトをコピーして作成することもできます。",
        },
        {
          name: "配置のチェック",
          description:
            "人数の不足、勤務時間の重複、資格の条件、一緒に配置しない組み合わせを自動で確認します。",
        },
        {
          name: "隊員への公開",
          description:
            "ログイン不要の閲覧用 URL、シフト表の画像、変更を知らせる連絡文を用意し、隊員に共有できます。",
        },
        {
          name: "勤務の中止の記録",
          description: "中止になった勤務を記録できます。",
        },
        {
          name: "月次集計と CSV 出力",
          description:
            "勤務の実績を月ごとに集計し、CSV ファイルで出力できます。",
        },
      ],
      pricing: {
        items: [
          { label: "初期費用", value: "0円" },
          { label: "月額利用料", value: "5,000円（税別）" },
          { label: "無料お試し", value: "30日間（1社1回）" },
          {
            label: "契約期間",
            value: "1か月ごとの自動更新（最低契約期間なし）",
          },
          { label: "お支払い方法", value: "請求書による銀行振込" },
        ],
        notes: ["無料お試しの期間中は料金がかかりません。"],
      },
      flow: [
        {
          title: "お問い合わせ・ヒアリング",
          description:
            "メールまたはお電話でご連絡ください。現在のシフト作成の状況をお伺いします。",
        },
        {
          title: "お見積り・お申し込み",
          description:
            "お見積りをお送りします。内容をご確認のうえお申し込みください。",
        },
        {
          title: "初期設定",
          description:
            "運営者が会社の登録と利用者の招待を行い、名簿の取り込みを支援します。",
        },
        {
          title: "無料お試し（30日間）",
          description: "実際の業務でお試しいただけます。",
        },
        {
          title: "本契約・利用開始",
          description: "お試しのあと、本契約に切り替えてご利用いただけます。",
        },
      ],
      screenshots: [],
      roadmap: ["上番・下番の報告", "給与計算", "LINE への自動配信"],
    },
  },
];

/** 詳細ページがあるサービスの、ページのパス（例: /services/risshocloud） */
export function servicePath(detail: ServiceDetail): string {
  return `/services/${detail.slug}`;
}

/** 詳細ページがあるサービスだけを返す */
export function servicesWithDetail(): (Service & { detail: ServiceDetail })[] {
  return services.filter(
    (service): service is Service & { detail: ServiceDetail } =>
      service.detail !== undefined,
  );
}

/** メタデータ（検索結果・共有時の説明文）用に、文言の改行を取り除く */
export function toMetaText(text: string): string {
  return text.replace(/\s*\n\s*/g, "");
}

/** 電話番号を tel: リンク用の形にする（例: 070-3865-4918 → tel:07038654918） */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}
