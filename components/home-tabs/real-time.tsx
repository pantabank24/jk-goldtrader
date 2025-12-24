"use client";

import React, { useMemo, useState } from "react";
import { Input } from "@heroui/react";
import { PriceDto } from "@/app/models/Models";

interface Props {
  pricing?: PriceDto;
  service: number; // ตัวคูณค่าบริการ เช่น 1, 1.07 เป็นต้น
}

type GoldItem = {
  percent: number;
  gram: string;
  plus: string | number;
  value: string;
};

// ---------- utils ----------
const clampNumber = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

const parseSafeFloat = (val: string, fallback = 0): number => {
  const parsed = parseFloat(val);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const nf2 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
const nf0 = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

const isNumericInput = (v: string) => /^\d*\.?\d*$/.test(v);

// debounce แบบ generic ที่ไม่ผูกกับ setState ภายนอก
function useDebounced<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ---------- component ----------
export const RealTime: React.FC<Props> = ({ pricing, service }) => {
  // เก็บเป็น string เพื่อรองรับการพิมพ์ทศนิยม/ช่องว่างระหว่างพิมพ์
  const [gram, setGram] = useState("1");
  const [plus, setPlus] = useState("0");

  // debounce ค่าอินพุตเพื่อลดการคำนวณถี่เกินไป
  const dGram = useDebounced(gram, 200);
  const dPlus = useDebounced(plus, 200);

  const handleGramChange = (i: string) => {
    if (parseFloat(i) > 999999) {
      i = "999999";
    }
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) < 0) {
        setGram("");
      } else {
        setGram(i);
      }
    }
  };

  const handlePlusChange = (value: string) => {
    if (!isNumericInput(value)) return;
    const n = clampNumber(parseSafeFloat(value), 0, 999999);
    setPlus(value === "" ? "" : n.toString());
  };

  // คำนวณรายการทองด้วย useMemo (pure, predictable)
  const goldList: GoldItem[] = useMemo(() => {
    const g = clampNumber(parseSafeFloat(dGram, 1), 0, 999999) || 0; // ถ้าเป็น "" จะได้ 0
    const p = clampNumber(parseSafeFloat(dPlus, 0), 0, 999999) || 0;
    const askPrice = pricing?.gold965?.ask ?? 0;
    const svc = service || 1;

    if (!askPrice || !svc || !g) {
      // คืนลิสต์ว่างเมื่อข้อมูลไม่พอ/กรัม = 0 เพื่อเลี่ยง division ไม่จำเป็น
      return [];
    }

    const items: GoldItem[] = [];
    // เตรียม percent list 100 -> 21
    for (let i = 100; i >= 21; i--) {
      const ratio = i / 100;
      let base = askPrice * svc * ratio * g;
      if (i > 30) base += p * svc * ratio * g;

      items.push({
        percent: i,
        gram: nf2.format(g),
        plus: i > 30 ? nf2.format(p) : 0,
        // ปัดลงทั้งจำนวน (ตามของเดิมใช้ Math.floor) แล้วทำคอมม่าด้วย Intl
        value: nf0.format(Math.floor(base)),
      });
    }
    return items;
  }, [dGram, dPlus, pricing?.gold965?.ask, service]);

  // helper แจ้งสถานะข้อมูลไม่พอ
  const showHint = useMemo(() => {
    if (!pricing?.gold965?.ask) return "ยังไม่มีราคาทอง (ask) ในระบบ";
    if (!service) return "ไม่มีค่า service multiplier";
    return null;
  }, [pricing?.gold965?.ask, service]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Title */}
      <div className="inline-block text-center justify-center w-full mt-20">
        <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          ตรวจราคาหลอมแบบเรียลไทม์
        </span>
      </div>

      <div className="flex flex-col items-center md:w-full md:px-5 xl:w-1/2">
        {/* Inputs */}
        <div className="grid lg:flex grid-cols-2 gap-y-2 gap-x-2 px-2 my-5 justify-start">
          <div className="flex flex-col h-24 items-center backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-[#0f2443] rounded-3xl px-2 pt-2">
            <span>น้ำหนัก (กรัม)</span>
            <Input
              color="default"
              classNames={{
                inputWrapper: "bg-white/20 backdrop-blur",
                input: "text-center",
              }}
              size="lg"
              className="my-2 text-base"
              type="text"
              inputMode="decimal"
              value={gram}
              onValueChange={handleGramChange}
              aria-label="น้ำหนัก (กรัม)"
              placeholder="เช่น 1, 15.2"
            />
          </div>

          <div className="flex flex-col h-24 items-center backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-[#0f2443] rounded-3xl px-2 pt-2">
            <span>ราคาบวก</span>
            <Input
              color="default"
              classNames={{
                inputWrapper: "bg-white/20 backdrop-blur",
                input: "text-center",
              }}
              size="lg"
              className="my-2 text-base"
              type="text"
              inputMode="decimal"
              value={plus}
              onValueChange={handlePlusChange}
              aria-label="ราคาบวก"
              placeholder="เช่น 50"
            />
          </div>
        </div>

        {/* Info / Hint */}
        {showHint && (
          <div className="w-full px-2 mb-2 text-center text-sm text-white/70">
            {showHint}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-2 w-full px-2">
          {goldList.map((item) => (
            <div
              key={item.percent}
              className="flex flex-col items-center backdrop-blur-xl border border-white/20 bg-white/10 rounded-xl px-1 pt-2 md:h-16"
            >
              <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-[#0f2443] w-full rounded-full flex items-center justify-center text-sm text-yellow-400">
                <span>{item.percent} %</span>
              </div>
              <span className="text-sm h-full items-center justify-center flex">
                {item.value}
              </span>
            </div>
          ))}

          {/* กรณีไม่มีรายการให้แสดง placeholder */}
          {goldList.length === 0 && (
            <div className="col-span-5 md:col-span-10 text-center py-6 text-white/70">
              ไม่มีข้อมูลสำหรับคำนวณ แก้ไขค่าน้ำหนัก/ราคาบวก
              หรือรอราคาทองเข้าระบบ
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
