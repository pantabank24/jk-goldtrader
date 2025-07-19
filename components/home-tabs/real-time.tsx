'use client';

import {
  Input,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { PriceDto } from "@/app/models/Models";

interface Props {
  pricing?: PriceDto;
  service: number;
}

interface GoldItem {
  percent: number;
  gram: string;
  plus: string | number;
  value: string;
}

export const RealTime = ({ pricing, service }: Props) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [gold, setGold] = useState<GoldItem[]>([]);
  const [gram, setGram] = useState("1");
  const [plus, setPlus] = useState("0");

  useEffect(() => {
    const timeout = setTimeout(() => {
      calculateGold();
    }, 200); // debounce 200ms

    return () => clearTimeout(timeout);
  }, [gram, plus]);

  const parseSafeFloat = (val: string, fallback: number = 0): number => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? fallback : parsed;
  };

  const formatNumber = (val: number): string => {
    return val.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const calculateGold = () => {
    const g = parseSafeFloat(gram, 1);
    const p = parseSafeFloat(plus, 0);
    const askPrice = pricing?.gold965.ask ?? 0;
    const safeService = service || 1;

    const goldList: GoldItem[] = [];

    for (let i = 100; i >= 21; i--) {
      let baseValue = askPrice * safeService * (i / 100) * g;
      if (i > 30) {
        baseValue += p * safeService * (i / 100) * g;
      }

      goldList.push({
        percent: i,
        gram: formatNumber(g),
        plus: i > 30 ? formatNumber(p) : 0,
        value: Math.floor(baseValue).toLocaleString(),
      });
    }

    setGold(goldList);
  };

  const handleGramChange = (value: string) => {
    if (parseSafeFloat(value) > 999999) value = '999999';
    if (/^\d*\.?\d*$/.test(value)) {
      setGram(parseSafeFloat(value) < 0 ? "1" : value);
    }
  };

  const handlePlusChange = (value: string) => {
    if (parseSafeFloat(value) > 999999) value = '999999';
    if (/^\d*\.?\d*$/.test(value)) {
      setPlus(parseSafeFloat(value) < 0 ? "0" : value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="inline-block text-center justify-center w-full mt-20">
        <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          ตรวจราคาหลอมแบบเรียลไทม์
        </span>
      </div>

      <div className="flex flex-col items-center md:w-full md:px-5 xl:w-1/2">
        <div className="grid lg:flex grid-cols-2 gap-y-2 gap-x-2 px-2 my-5 justify-start">
          <div className="flex flex-col h-24 items-center backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-red-900 rounded-3xl px-2 pt-2">
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
            />
          </div>
          <div className="flex flex-col h-24 items-center backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-red-900 rounded-3xl px-2 pt-2">
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
            />
          </div>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-x-2 gap-y-2 w-full px-2">
          {gold.map((item) => (
            <div
              key={item.percent}
              className="flex flex-col items-center backdrop-blur-xl border border-white/20 bg-white/10 rounded-xl px-1 pt-2 md:h-16"
            >
              <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-red-900 w-full rounded-full flex items-center justify-center text-sm text-yellow-400">
                <span>{item.percent} %</span>
              </div>
              <span className="text-sm h-full items-center justify-center flex">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
