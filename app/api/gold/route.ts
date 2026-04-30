import axios from "axios";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const ts = Date.now();
    const url = `https://thaigold.info/RealTimeDataV2/GoldPriceToday.xml?_=${ts}`;
    const res = await axios.get(url);
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
