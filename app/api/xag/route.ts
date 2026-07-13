import axios from "axios";

import { describeError } from "@/lib/jk-api";

export const dynamic = "force-dynamic";

// ยังดึงตรงจาก bowinsgroup อยู่ เพราะ metal_prices ใน jk-api ไม่ได้เก็บ round/previous
// ที่หน้าเว็บใช้แสดง ("ครั้งที่ N") — ปลายทางนี้ยิงจาก Vercel ได้ปกติ ไม่โดนบล็อกเหมือน thaigold
export async function GET() {
    try {
        const get = await axios.get('https://cloud.bowinsgroup.com/ipn/response_silverbar.php', {
            timeout: 8000,
        });

        const res = {
            timestamp: get.data[0].created,
            spot: Number(get.data[0].rate_spot ?? "0"),
            exchange: Number(get.data[0].rate_exchange ?? "0"),
            sell: Number(get.data[0].sell ?? "0"),
            buy: Number(get.data[0].buy ?? "0"),
            previous: Number(get.data[0].PREVIOUS_PRICE ?? "0"),
            round: Number(get.data[0].no)
        }

        return new Response(JSON.stringify(res), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
            },
        })
    } catch (err: any) {
        console.error("[xag] failed:", describeError(err));

        return new Response(JSON.stringify({ error: "ดึงราคาเงินไม่สำเร็จ" }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
        })
    }
}
