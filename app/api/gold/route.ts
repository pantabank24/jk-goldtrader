import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const res = await axios.get('https://xn--42cah7d0cxcvbbb9x.com/');
    const $ = cheerio.load(res.data);

    let ask = null;
    let bid = null;
    let changeToday: number | null = null;
    let changeFromYesterday: number | null = null;
    let latestUpdate: string | null = null;

    $('tr').each((_, el) => {
      const tds = $(el).find('td');
      if (tds.length >= 3 && $(tds[0]).text().includes('ทองคำแท่ง')) {
        ask = parseFloat($(tds[1]).text().replace(/,/g, ''));
        bid = parseFloat($(tds[2]).text().replace(/,/g, ''));
        return false; // หยุด loop เมื่อเจอแล้ว
      }
    });
  

    $('tr').each((_, el) => {
      const tds = $(el).find('td');

      // ✅ หาแถวที่มี span.css-sprite-up → "วันนี้ +100"
      if ($(tds[0]).text().includes('วันนี้ ')) {
        changeFromYesterday = parseFloat($(tds[0]).text().replace(/[^\d.-]/g, ''));
      }

      // ✅ หาแถวสุดท้ายที่มี "-50"
      if ($(tds[2]).text().includes('-')) {
        changeToday = parseFloat($(tds[2]).text().replace(/,/g, ''));
      }
    });

    if (bid === null || ask === null) {
      throw new Error('ไม่ได้พบข้อมูลราคาทองคำแท่ง');
    }

    const data = {
      gold965: {
        ask,
        bid,
        diff: ask - bid,
        change_today: changeToday,
        change_yesterday: changeFromYesterday,
        latest_update: latestUpdate
      },
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message || 'Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


// import axios from 'axios';
// import * as cheerio from 'cheerio';

// export async function GET() {
//   try {
//     const response = await axios.get('https://www.goldtraders.or.th');
//     const $ = cheerio.load(response.data);

//     const gold965Bid = $('#DetailPlace_uc_goldprices1_lblBLSell').text();
//     const gold965Ask = $('#DetailPlace_uc_goldprices1_lblBLBuy').text();

//     const data = {
//       gold965: {
//         bid: parseFloat(gold965Bid.replace(',', '')),
//         ask: parseFloat(gold965Ask.replace(',', '')),
//         diff: null,
//       },
//       timestamp: new Date().toISOString(),
//     };

//     return new Response(JSON.stringify(data), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (err) {
//     console.error('Error fetching gold price:', err);
//     return new Response(JSON.stringify({ error: 'Failed to fetch gold price' }), {
//       status: 500,
//     });
//   }
// }
