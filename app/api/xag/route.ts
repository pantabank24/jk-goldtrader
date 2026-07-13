import axios from "axios";

export const dynamic = "force-dynamic";
export const preferredRegion = ["sin1"];

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
            headers: { "Content-Type": "application/json" },
        })
    } catch (e: any) {
        console.error("[xag] failed:", axios.isAxiosError(e)
            ? `${e.config?.url} -> ${e.response?.status ?? e.code ?? "no response"}`
            : e?.message || String(e));

        return new Response(JSON.stringify({ error: "ดึงราคาเงินไม่สำเร็จ" }), {
            status: 502,
            headers: { "Content-Type": "application/json" },
        })
    }
}
