import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

const SCRAPE_URL = "https://xn--42cah7d0cxcvbbb9x.com/";
const PROXY_API = "https://gold-proxy.benzsnoopdog.workers.dev/";

async function fetchWithScrape() {
  const response = await fetch(SCRAPE_URL, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'th,en;q=0.9,en-US;q=0.8',
      'Cache-Control': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
    },
    next: { revalidate: 0 }
  });

  if (!response.ok) throw new Error(`Scrape failed with status: ${response.status}`);

  const html = await response.text();
  const $ = cheerio.load(html);

  let ask = null;
  let bid = null;
  let changeToday: number | null = null;
  let changeFromYesterday: number | null = null;

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
        $(tds[0]).text().replace(/[^\d.-]/g, "")
      );
      changeToday = parseFloat($(tds[2]).text().replace(/,/g, ""));
    }
  });

  if (bid === null || ask === null) throw new Error("Could not find gold prices in HTML");

  return {
    gold965: {
      ask,
      bid,
      diff: ask - bid,
      change_today: changeToday,
      change_yesterday: changeFromYesterday,
      latest_update: null,
    },
    timestamp: new Date().toISOString(),
    source: "direct-scrape"
  };
}

async function fetchWithProxy() {
  const response = await fetch(PROXY_API, {
    headers: { 'Accept': 'application/json' },
    next: { revalidate: 0 }
  });

  if (!response.ok) throw new Error(`Proxy failed with status: ${response.status}`);

  const resData = await response.json();
  const { prices, meta } = resData;

  const ask = prices.bar.buy;
  const bid = prices.bar.sell;

  return {
    gold965: {
      ask,
      bid,
      diff: ask - bid,
      change_today: null,
      change_yesterday: null,
      latest_update: meta ? `${meta.date_th} ${meta.time_th} (รอบที่ ${meta.round})` : null,
    },
    timestamp: new Date().toISOString(),
    source: "benzsnoopdog-proxy"
  };
}

export async function GET() {
  // Try Direct Scrape -> Proxy -> Fallback API
  try {
    const data = await fetchWithScrape();
    return NextResponse.json(data);
  } catch (err: any) {
    console.warn("Direct scrape failed, trying proxy:", err.message);
    
    try {
      const data = await fetchWithProxy();
      return NextResponse.json(data);
    } catch (proxyErr: any) {
      console.warn("Proxy failed, trying fallback API:", proxyErr.message);
      
      try {
        const fallback = await fetch("https://static-gold.tothanate.workers.dev/", { next: { revalidate: 0 } });
        const fbJson = await fallback.json();
        const fbData = fbJson.current_prices.gold_bar;
        
        return NextResponse.json({
          gold965: {
            ask: fbData.buy,
            bid: fbData.sell,
            diff: fbData.buy - fbData.sell,
            change_today: fbData.change,
            change_yesterday: null,
            latest_update: fbJson.metadata.update_info,
          },
          timestamp: new Date().toISOString(),
          source: "tothanate-fallback"
        });
      } catch (finalErr: any) {
        return NextResponse.json({ error: "All sources failed", message: finalErr.message }, { status: 500 });
      }
    }
  }
}


