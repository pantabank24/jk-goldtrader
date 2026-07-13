import { describeError, fetchFromJkApi } from "@/lib/jk-api";

export const dynamic = "force-dynamic";

// ราคาสมาคม (auto = cron ของ jk-api, manual = ที่ร้านตั้งเอง) อ่านจาก DB ของ jk-api
type GoldPrice = {
  bar_buy: number;
  bar_sell: number;
  change_today: number;
  change_yesterday: number;
  gold_date: string;
  gold_time: string;
};

export async function GET() {
  try {
    const gp = await fetchFromJkApi<GoldPrice>("/gold-prices/latest");

    // คงชื่อฟิลด์เดิมไว้ ask = ราคารับซื้อ, bid = ราคาขายออก (ตามที่ UI ใช้อยู่)
    const ask = Number(gp.bar_buy);
    const bid = Number(gp.bar_sell);

    const data = {
      gold965: {
        ask,
        bid,
        diff: ask - bid,
        change_today: Number(gp.change_today),
        change_yesterday: Number(gp.change_yesterday),
        latest_update: `${gp.gold_date} ${gp.gold_time}`.trim(),
      },
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch (err: any) {
    console.error("[gold] jk-api failed:", describeError(err));

    return new Response(
      JSON.stringify({ error: "ดึงราคาทองไม่สำเร็จ", detail: describeError(err) }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }
}
