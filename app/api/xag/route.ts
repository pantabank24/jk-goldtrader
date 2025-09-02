import { XAGModel } from "@/app/models/XAG-Model";
import axios from "axios";

export async function GET() {
    try {
        const get = await axios.get('https://besserver.dyndns.org/ipn/response_silverbar.php');

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
    } catch (e) {
        console.log(e)
    }
}