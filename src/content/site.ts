/**
 * サイトに載せる内容。文言の変更やサービスの追加は、このファイルだけを編集すればよい。
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
    "Parakeets works は、業務システムの開発・提供を行う事業者です。現在、警備会社向けのクラウドサービスの提供に向けて開発を進めています。",
} as const;

export type Service = {
  name: string;
  /** 対象と内容を1〜2文で */
  summary: string;
  /** サービスのURL。まだない場合は省略する（リンクを出さず「準備中」と表示する） */
  url?: string;
};

/** 提供中のサービス。追加するときは、この配列に要素を足す */
export const services: readonly Service[] = [
  {
    name: "立哨クラウド",
    summary:
      "警備会社向けのシフト作成サービスです。隊員の勤務可能時間をもとにシフトを作成し、隊員への共有までをまとめて行えます。",
  },
];

/** 電話番号を tel: リンク用の形にする（例: 070-3865-4918 → tel:07038654918） */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}
