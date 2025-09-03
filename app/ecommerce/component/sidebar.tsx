"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export const SideBar = () => {
  const path = usePathname();
  const router = useRouter();

  const menu = [
    {
      id: 0,
      name: "ขายทอง",
      path: "/ecommerce/seller",
    },
    {
      id: 1,
      name: "รายการขาย",
      path: "/ecommerce/order",
    },
  ];

  return (
    <div
      className={`flex flex-col p-4 w-64 h-full rounded-3xl  max-lg:hidden border border-white/20 bg-gradient-to-b from-white/10 to-white/10 ${path == "/ecommerce" ? "hidden" : ""}`}
    >
      <div className=" flex flex-col">
        <span className=" text-sm">สวัสดีตอนเช้า</span>
        <span className=" text-xl">คุณวีรชัย ชัยนุมาศ</span>
      </div>

      <div className=" flex flex-col gap-y-2 mt-5">
        {menu.map((v, i) => (
          <div
            key={i}
            onClick={() => router.push(v.path)}
            className={`cursor-pointer border border-white/20 bg-gradient-to-b ${v?.path == path ? "bg-[#710711]" : " from-white/10 to-white/10"} p-2 rounded-xl`}
          >
            {v.name}
          </div>
        ))}
      </div>

      <div className=" h-full flex items-end justify-center text-xs font-light text-white/10">
        Build 0.1.2 (Preview)
      </div>
    </div>
  );
};
