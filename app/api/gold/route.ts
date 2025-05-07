import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const response = await axios.get('https://www.goldtraders.or.th');
    const $ = cheerio.load(response.data);

    const gold965Bid = $('#DetailPlace_uc_goldprices1_lblBLSell').text();
    const gold965Ask = $('#DetailPlace_uc_goldprices1_lblBLBuy').text();

    const data = {
      gold965: {
        bid: parseFloat(gold965Bid.replace(',', '')),
        ask: parseFloat(gold965Ask.replace(',', '')),
        diff: null,
      },
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching gold price:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch gold price' }), {
      status: 500,
    });
  }
}
