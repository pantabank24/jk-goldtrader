import axios from "axios";

const GOLD_API_URL = "https://gold-proxy.benzsnoopdog.workers.dev/";

export async function GET() {
  try {
    const res = await axios.get(GOLD_API_URL, { timeout: 10000 });
    const { prices, meta } = res.data;

    if (!prices?.bar?.buy || !prices?.bar?.sell) {
      throw new Error("ไม่พบข้อมูลราคาทองคำแท่ง");
    }

    const ask = prices.bar.buy;
    const bid = prices.bar.sell;

    const data = {
      gold965: {
        ask,
        bid,
        diff: ask - bid,
        change_today: null,
        change_yesterday: null,
        latest_update: meta
          ? `${meta.date_th} ${meta.time_th} (รอบที่ ${meta.round})`
          : null,
      },
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Gold price fetch failed:", err);
    return new Response(JSON.stringify({ error: err.message || "Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
