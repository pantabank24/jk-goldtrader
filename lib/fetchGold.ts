// lib/fetchGold.js
import puppeteer from 'puppeteer';

export async function fetchGold() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('https://www.intergold.co.th', { waitUntil: 'domcontentloaded' });

  // รอให้ข้อมูลในหน้าโหลด
  await page.waitForSelector('#gold-bar-bid');
  await page.waitForSelector('#gold-bar-ask');

  // ดึงข้อมูลทั้งหมดจากหน้า
  const data = await page.evaluate(() => {
    const goldData = {
      bid: document.querySelector('#gold-bar-bid')?.textContent?.trim() || 'ไม่พบข้อมูล',
      ask: document.querySelector('#gold-bar-ask')?.textContent?.trim() || 'ไม่พบข้อมูล',
      otherInfo: document.querySelector('#other-info')?.textContent?.trim() || 'ไม่พบข้อมูล',
      // เพิ่มข้อมูลอื่นๆ ที่ต้องการ
    };

    return goldData;
  });

  await page.waitForSelector('#gold-bar-bid', { timeout: 5000 });  // รอ 5 วินาที
await page.waitForSelector('#gold-bar-ask', { timeout: 5000 });

  await browser.close();
  return data; // ส่งข้อมูลทั้งหมด
}
