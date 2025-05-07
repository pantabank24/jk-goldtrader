import { Fira_Code as FontMono, Inter as FontSans, Kanit as FontKanit } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontKanit = FontKanit({
  subsets: ["latin", "thai"], // สามารถเพิ่ม "thai" ได้ถ้าต้องการใช้ฟอนต์นี้สำหรับภาษาไทย
  weight: ["400", "500", "600"], // กำหนดน้ำหนักของฟอนต์
  variable: "--font-kanit", // ใช้ตัวแปร CSS
});