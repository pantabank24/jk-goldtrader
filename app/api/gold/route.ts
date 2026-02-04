import axios from "axios";
import * as cheerio from "cheerio";

export async function GET() {
  try {
    const res = await axios.get("https://xn--42cah7d0cxcvbbb9x.com/");
    const $ = cheerio.load(res.data);

    let ask = null;
    let bid = null;
    let changeToday: number | null = null;
    let changeFromYesterday: number | null = null;
    let latestUpdate: string | null = null;

    $("tr").each((_, el) => {
      const tds = $(el).find("td");
      if (tds.length >= 3 && $(tds[0]).text().includes("ทองคำแท่ง")) {
        ask = parseFloat($(tds[1]).text().replace(/,/g, ""));
        bid = parseFloat($(tds[2]).text().replace(/,/g, ""));
        return false;
      }
    });

    $("tr").each((_, el) => {
      const tds = $(el).find("td");

      if ($(tds[0]).text().includes("วันนี้ ")) {
        changeFromYesterday = parseFloat(
          $(tds[0])
            .text()
            .replace(/[^\d.-]/g, ""),
        );
        changeToday = parseFloat($(tds[2]).text().replace(/,/g, ""));
      }

      if ($(tds[2]).text()) {
      }
    });

    if (bid === null || ask === null) {
      throw new Error("ไม่ได้พบข้อมูลราคาทองคำแท่ง");
    }

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
  } catch (err: any) {
    try {
      return reserved();
    } catch (err: any) {
      console.error(err);
      return new Response(JSON.stringify({ error: err.message || "Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}

const reserved = async () => {
  try {
    const res = await axios.get("https://static-gold.tothanate.workers.dev/");

    var ask = res?.data?.current_prices?.gold_bar?.buy ?? 0;
    var bid = res?.data?.current_prices?.gold_bar?.sell ?? 0;

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
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message || "Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
