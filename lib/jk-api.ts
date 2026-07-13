import axios from "axios";

const BASE_URL = process.env.JK_API_URL;
const API_KEY = process.env.JK_API_KEY;

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
export async function fetchFromJkApi<T>(path: string): Promise<T> {
  if (!BASE_URL || !API_KEY) {
    throw new Error("JK_API_URL หรือ JK_API_KEY ยังไม่ได้ตั้งค่า");
  }

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
  return axios.isAxiosError(err)
    ? `${err.config?.url} -> ${err.response?.status ?? err.code ?? "no response"}`
    : err?.message || String(err);
}
