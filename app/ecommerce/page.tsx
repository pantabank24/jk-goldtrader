"use client";

import { BookAudio, Box, Code, CodeXml, icons } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import p1 from "../../public/images/ads1.jpg";

export default function ECommerce() {
  const path = usePathname();
  const router = useRouter();

  const menu = [
    {
      id: 0,
      name: "ขายทอง",
      icon: <Box size={30} />,
      path: "/ecommerce/seller",
    },
    {
      id: 1,
      name: "รายการขาย",
      icon: <BookAudio size={30} />,
      path: "/ecommerce/order",
    },
  ];

  return (
    <div className=" flex flex-col gap-y-4 px-4 w-full lg:w-1/2 h-full">
      <div className=" flex flex-col">
        <span className=" text-lg">สวัสดีตอนเช้า</span>
        <span className=" text-3xl font-bold bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent">
          คุณวีรชัย ชัยนุมาศ
        </span>
      </div>

      <div className=" flex flex-col gap-y-2 ">
        <div className=" flex flex-row gap-x-2 ">
          {menu.map((v, i) => (
            <div
              key={i}
              onClick={() => router.push(v.path)}
              className={`cursor-pointer border border-white/20 bg-gradient-to-b ${v?.path == path ? "bg-[#710711]" : " from-white/10 to-white/10"}  rounded-xl py-5 w-32 items-center justify-center flex flex-col text-yellow-100`}
            >
              {v.icon}
              {v.name}
            </div>
          ))}
        </div>
      </div>

      <div className=" flex flex-col gap-y-2">
        <span>ข่าวสาร</span>
        <div className="border border-white/20 bg-gradient-to-b from-white/10 to-white/10 flex w-full  h-96 rounded-2xl items-center justify-center flex-col">
          <CodeXml size={50} />
          อยู่ในระหว่างการพัฒนา
        </div>
      </div>
    </div>
  );
}
