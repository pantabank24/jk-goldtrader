import axios from "axios";

const TIMEOUT_MS = 8000;

type Envelope<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

/**
 * Reads a public route on jk-api. Prices are served straight from jk-api's
 * Postgres (its cron owns the scraping), so nothing here talks to an upstream
 * price site — that is what kept breaking on Vercel.
 */
/**
 * ทำความสะอาดค่าที่คนกรอกใน Vercel: ตัดช่องว่าง/ขึ้นบรรทัดใหม่, ลอกเครื่องหมาย
 * คำพูดที่ครอบมา, ตัด "JK_API_URL=" ที่เผลอวางติดมาทั้งบรรทัด, เติม https:// ให้
 * ถ้าลืมใส่ แล้วค่อยตรวจว่า parse เป็น URL ได้จริง
 */
function normalizeBaseUrl(raw: string): string {
  let url = raw.trim().replace(/^JK_API_URL\s*=\s*/i, "");

  url = url.replace(/^["']|["']$/g, "").trim();
  url = url.replace(/\/+$/, "");
  // เผื่อกรอก path ต่อท้ายมาด้วย — โค้ดเติม /api/v1/public เองอยู่แล้ว
  url = url.replace(/\/api(\/v1(\/public)?)?$/i, "");

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    new URL(url);
  } catch {
    throw new Error(`JK_API_URL ใช้ไม่ได้ (ค่าที่ได้รับ: ${JSON.stringify(raw)})`);
  }

  return url;
}

export async function fetchFromJkApi<T>(path: string): Promise<T> {
  // อ่านตอน request ไม่ใช่ตอน module load — ไม่งั้น Next จะ inline ค่าตอน build
  // ทำให้ env ที่เพิ่มทีหลังไม่มีผลจนกว่าจะ build ใหม่
  const rawUrl = process.env.JK_API_URL;
  const API_KEY = process.env.JK_API_KEY?.trim();

  if (!rawUrl || !API_KEY) {
    const missing = [
      !rawUrl && "JK_API_URL",
      !API_KEY && "JK_API_KEY",
    ].filter(Boolean).join(", ");

    throw new Error(`env ยังไม่ได้ตั้งค่า: ${missing}`);
  }

  const BASE_URL = normalizeBaseUrl(rawUrl);

  const res = await axios.get<Envelope<T>>(`${BASE_URL}/api/v1/public${path}`, {
    timeout: TIMEOUT_MS,
    headers: { "X-API-Key": API_KEY },
  });

  if (!res.data?.data) {
    throw new Error(res.data?.message || "jk-api ไม่มีข้อมูลราคา");
  }

  return res.data.data;
}

export function describeError(err: any) {
  if (!axios.isAxiosError(err)) return err?.message || String(err);

  const status = err.response?.status ?? err.code ?? "no response";
  // ต่อ message ที่ jk-api ส่งกลับมาด้วย จะได้แยกออกว่า 401 เพราะ key ไม่ตรง
  // หรือเพราะ server ยังไม่ได้ตั้ง PUBLIC_API_KEY
  const upstream = (err.response?.data as any)?.message;

  return `${err.config?.url} -> ${status}${upstream ? ` (${upstream})` : ""}`;
}
