"use client";

import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import {
  ChevronLeft,
  Coins,
  FilePlus,
  ListMinus,
  PackagePlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PricingPage() {
  const router = useRouter();
  const goldTypes = [
    { key: "3", label: "ทองหลอม" },
    { key: "1", label: "ทองคำแท่ง 96.5%" },
    { key: "2", label: "ทองรูปพรรณ" },
    { key: "4", label: "กรอบทอง/ตลับทอง" },
    { key: "5", label: "ทอง 9K" },
    { key: "6", label: "ทอง 14K" },
    { key: "7", label: "ทอง 18K" },
    { key: "8", label: "อื่น ๆ" },
  ];

  const [option, setOption] = useState("3");

  return (
    <div className=" flex flex-col w-full lg:w-1/2  gap-y-4 px-5">
      <div className=" text-2xl lg:text-4xl font-bold bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent  flex flex-row items-center gap-x-2">
        <ChevronLeft
          className=" text-white lg:hidden flex items-center justify-center"
          onClick={() => router.push("/ecommerce")}
          size={30}
        />
        ขายทองคำ
      </div>
      <div className=" flex w-full rounded-full py-2 px-5 border border-white/20 bg-gradient-to-b from-white/20 to-white/20 justify-between">
        <div>คำนวณราคาตามระบบ</div>
        <Switch color="warning" />
      </div>
      <div className=" border border-white/20 bg-gradient-to-b from-black to-white/10 flex flex-col gap-y-3 w-full p-3 rounded-3xl">
        <div className=" flex flex-row gap-x-4 overflow-x-scroll scrollbar-hide">
          <img
            className=" flex w-36 h-36 lg:w-52 lg:h-52 object-cover rounded-2xl"
            src="/images/banner2.jpg"
          />
          <div className="w-36 h-36 lg:w-52 lg:h-52 bg-white/10 text-white/50 rounded-2xl flex flex-shrink-0 flex-col items-center justify-center gap-y-2 font-bold">
            <PackagePlus size={40} />
            <div>เพิ่มรูปทอง</div>
          </div>
        </div>

        <div className="flex-1">
          <div className={`flex items-center w-full gap-2`}>
            <Input
              size="lg"
              label={
                <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                  ราคาทอง
                </div>
              }
              endContent={<div className=" text-xs">บาท</div>}
              labelPlacement="outside"
              placeholder=" "
            />
            <Select
              aria-label="เลือกประเภททอง"
              label={
                <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                  ประเภททอง
                </div>
              }
              labelPlacement="outside"
              //onChange={(e) => handleOptionChange(e)}
              className=" w-full"
              selectedKeys={option}
              size="lg"
              classNames={{
                trigger: "backdrop-blur-xl border border-white/10 ",
                popoverContent:
                  "backdrop-blur-xl border border-white/10 bg-black/30",
              }}
            >
              {goldTypes.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex-1">
          <div className={`flex items-center w-full gap-2`}>
            <Input
              size="lg"
              label={
                <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                  เปอร์เซ็นต์ทอง
                </div>
              }
              endContent={<div className=" text-xs">%</div>}
              labelPlacement="outside"
              placeholder=" "
            />
            <Input
              size="lg"
              label={
                <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                  ราคาบวก
                </div>
              }
              endContent={<div className=" text-xs">บาท</div>}
              labelPlacement="outside"
              placeholder=" "
            />
          </div>
        </div>

        <div className="flex-1">
          <div className={`flex items-center w-full gap-2`}>
            <Input
              size="lg"
              label={
                <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                  น้ำหนักทอง
                </div>
              }
              endContent={<div className=" text-xs">กรัม</div>}
              labelPlacement="outside"
              placeholder=" "
            />
            <Input
              size="lg"
              label={
                <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                  ราคาที่ต้องการ
                </div>
              }
              endContent={<div className=" text-xs">บาท</div>}
              labelPlacement="outside"
              placeholder=" "
            />
          </div>
        </div>

        <Input
          size="lg"
          label={
            <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
              รายละเอียด
            </div>
          }
          labelPlacement="outside"
          placeholder=" "
        />
      </div>

      <div className=" flex flex-row gap-x-2">
        <button
          // onClick={() => handleQuote()}
          className=" w-16 h-16 flex-shrink-0 justify-center backdrop-blur-xl border  border-white/20 bg-gradient-to-b from-blue-500/60 to-blue-600/60 text-white  rounded-full transition-all duration-200 hover:scale-105 flex flex-row items-center "
        >
          <ListMinus size={25} />
        </button>
        <button
          // onClick={() => handleQuote()}
          className=" w-full h-16 justify-center backdrop-blur-xl border  border-white/20 bg-gradient-to-b from-green-500/60 to-green-600/60 b-1 text-white  rounded-full transition-all duration-200 hover:scale-105 flex flex-row items-center "
        >
          <Coins size={25} />
          <span className=" pl-2 text-md">ขายเลย</span>
        </button>
      </div>
    </div>
  );
}
