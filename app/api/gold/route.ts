import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";

const CHNWT_API = "https://api.chnwt.dev/thai-gold-api/latest";
const OFFICIAL_URL = "https://www.goldtraders.or.th/default.aspx";
const PROXY_API = "https://gold-proxy.benzsnoopdog.workers.dev/";

async function fetchFromChnwt() {
  const response = await fetch(CHNWT_API, { next: { revalidate: 0 } });
  if (!response.ok) throw new Error(`CHNWT API failed: ${response.status}`);
  
  const resData = await response.json();
  if (resData.status !== "success") throw new Error("CHNWT API returned error status");

  const price = resData.response.price.gold_bar;
  const ask = parseFloat(price.buy.replace(/,/g, ""));
  const bid = parseFloat(price.sell.replace(/,/g, ""));

  return {
    gold965: {
      ask,
      bid,
      diff: bid - ask,
      change_today: null,
      change_yesterday: null,
      latest_update: `${resData.response.update_date} ${resData.response.update_time}`,
    },
    timestamp: new Date().toISOString(),
    source: "chnwt-api",
  };
}

async function fetchViaGlobalProxy() {
  const bridgeUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(OFFICIAL_URL)}`;
  const response = await fetch(bridgeUrl, { next: { revalidate: 0 } });
  if (!response.ok) throw new Error(`Global bridge failed: ${response.status}`);
  
  const wrapper = await response.json();
  const $ = cheerio.load(wrapper.contents || "");
  
  const ask = parseFloat($("#DetailPlace_uc_goldprices1_lblBLBuy").text().replace(/,/g, ""));
  const bid = parseFloat($("#DetailPlace_uc_goldprices1_lblBLSell").text().replace(/,/g, ""));
  
  if (isNaN(ask) || isNaN(bid)) throw new Error("Failed to parse prices via bridge");

  return {
    gold965: {
      ask,
      bid,
      diff: bid - ask,
      change_today: parseFloat($("#DetailPlace_uc_goldprices1_lblDiff").text().replace(/,/g, "")),
      change_yesterday: null,
      latest_update: $("#DetailPlace_uc_goldprices1_lblLastUpdate").text().trim(),
    },
    timestamp: new Date().toISOString(),
    source: "global-bridge-scrape",
  };
}

export async function GET() {
  // Chain: CHNWT -> Bridge -> Proxy -> Fallback
  try {
    const data = await fetchFromChnwt();
    return NextResponse.json(data);
  } catch (err: any) {
    console.warn("CHNWT API failed, trying Bridge:", err.message);

    try {
      const data = await fetchViaGlobalProxy();
      return NextResponse.json(data);
    } catch (bridgeErr: any) {
      console.warn("Bridge failed, trying Proxy:", bridgeErr.message);

      try {
        const response = await fetch(PROXY_API, { next: { revalidate: 0 } });
        const resData = await response.json();
        
        if (resData.ok && resData.prices?.bar) {
            return NextResponse.json({
              gold965: {
                ask: resData.prices.bar.buy,
                bid: resData.prices.bar.sell,
                diff: resData.prices.bar.sell - resData.prices.bar.buy,
                change_today: null,
                change_yesterday: null,
                latest_update: resData.meta ? `${resData.meta.date_th} ${resData.meta.time_th}` : null,
              },
              timestamp: new Date().toISOString(),
              source: "benzsnoopdog-proxy",
            });
        }
        throw new Error("Proxy response invalid");
      } catch (proxyErr: any) {
        return NextResponse.json({ 
            error: "All sources failed", 
            message: proxyErr.message,
            chnwt_error: err.message,
            bridge_error: bridgeErr.message
        }, { status: 500 });
      }
    }
  }
}
