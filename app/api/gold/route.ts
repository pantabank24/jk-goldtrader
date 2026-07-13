import axios from "axios";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

// thaigold.info ปฏิเสธ request ที่ไม่ได้มาจาก IP ไทย/เอเชีย ต้องรัน function ใกล้ ๆ ไทย
export const preferredRegion = ["sin1"];

const TIMEOUT_MS = 8000;

const describe = (err: any) =>
  axios.isAxiosError(err)
    ? `${err.config?.url} -> ${err.response?.status ?? err.code ?? "no response"}`
    : err?.message || String(err);

export async function GET() {
  try {
    const ts = Date.now();
    const url = `https://thaigold.info/RealTimeDataV2/GoldPriceToday.xml?_=${ts}`;
    const res = await axios.get(url, { timeout: TIMEOUT_MS });
    const $ = cheerio.load(res.data, { xmlMode: true });

    const ask = parseFloat($('buyprice').text().replace(/,/g, ''));
    const bid = parseFloat($('saleprice').text().replace(/,/g, ''));
    const changeToday = parseFloat($('buypricechg').text().replace(/,/g, ''));
    const changeFromYesterday = parseFloat($('SumOfChg').text().replace(/,/g, ''));
    const latestUpdate = $('update').text();

    if (isNaN(bid) || isNaN(ask)) {
      throw new Error('ไม่ได้พบข้อมูลราคาทองคำแท่ง');
    }

    const data = {
      gold965: {
        ask,
        bid,
        diff: ask - bid,
        change_today: changeToday,
        change_yesterday: changeFromYesterday,
        latest_update: latestUpdate,
      },
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (primaryErr: any) {
    console.error("[gold] primary (thaigold.info) failed:", describe(primaryErr));

    try {
      return await reserved();
    } catch (fallbackErr: any) {
      console.error("[gold] fallback failed:", describe(fallbackErr));

      return new Response(
        JSON.stringify({
          error: "ดึงราคาทองไม่สำเร็จ",
          primary: describe(primaryErr),
          fallback: describe(fallbackErr),
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }
  }
}

const reserved = async () => {
  const res = await axios.get("https://static-gold.tothanate.workers.dev/", {
    timeout: TIMEOUT_MS,
  });

  const ask = res?.data?.current_prices?.gold_bar?.buy ?? 0;
  const bid = res?.data?.current_prices?.gold_bar?.sell ?? 0;

  const data = {
    gold965: {
      ask,
      bid,
      diff: ask - bid,
      change_today: res?.data?.current_prices?.gold_bar?.change ?? 0,
      change_yesterday: null,
      latest_update: res?.data?.metadata?.update_info ?? "",
    },
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};
