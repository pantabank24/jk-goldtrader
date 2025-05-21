import { redirect } from "next/navigation";

export default function Home() {
  redirect('/homepage'); // ส่งผู้ใช้ไป /dashboard
}