import axios from "axios";
import * as cheerio from "cheerio";

export async function GET() {
  try {
    // Source: สมาคมค้าทองคำ (Gold Traders Association)
    const res = await axios.get("https://classic.goldtraders.or.th/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "th,en;q=0.9",
      },
      timeout: 10000,
    });
    const $ = cheerio.load(res.data);

    // Extract gold bar (ทองคำแท่ง 96.5%) prices using ASP.NET element IDs
    const askText = $("#DetailPlace_uc_goldprices1_lblBLSell").text();
    const bidText = $("#DetailPlace_uc_goldprices1_lblBLBuy").text();

    const ask = parseFloat(askText.replace(/,/g, ""));
    const bid = parseFloat(bidText.replace(/,/g, ""));

    if (isNaN(ask) || isNaN(bid)) {
      throw new Error("ไม่พบข้อมูลราคาทองคำแท่งจากสมาคมค้าทองคำ");
    }

    // Extract update timestamp
    const timeText = $("#DetailPlace_uc_goldprices1_lblAsTime").text().trim();

    const data = {
      gold965: {
        ask,
        bid,
        diff: ask - bid,
        change_today: null,
        change_yesterday: null,
        latest_update: timeText || null,
      },
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Gold API Error:", err.message);

    // Fallback: try alternative source
    try {
      return await fetchFromFallback();
    } catch (fallbackErr: any) {
      console.error("Fallback Error:", fallbackErr.message);
      return new Response(
        JSON.stringify({
          error: err.message || "ไม่สามารถดึงข้อมูลราคาทองได้",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }
}

async function fetchFromFallback() {
  const res = await axios.get("https://static-gold.tothanate.workers.dev/", {
    timeout: 10000,
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
}
