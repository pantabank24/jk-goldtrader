'use client'

import React from "react";
import { HomePages } from "@/components/home-tabs/home";
import useSWR from "swr";
import { PriceDto } from "./models/Models";
import { TabBars } from "@/components/tabbar";
import { RealTime } from "@/components/home-tabs/real-time";
import { Quotation } from "@/components/home-tabs/quotation";
import { QuotationModel } from "./models/Quotations";
import ModernNavbar from "@/components/navbar";
import { Toast } from "@heroui/react";
import PWAInstaller from "@/components/PWAInstaller";

export default function Home() {
  const fetcher = (url: string) => fetch('/api/gold').then(res => res.json());
  const { data, error, isLoading, isValidating } = useSWR<PriceDto>('/api/gold', fetcher)
  let service = 0.0656;

  const [tab, setTab] = React.useState<string>("home")
  const [quotational, setQuotational] = React.useState<QuotationModel[]>([])

  const handleSelectQuotation = (currentQuot?: QuotationModel) => {
    if (currentQuot != null)
      setQuotational(
        [...quotational, currentQuot!]
      )
    }

    const handleDropIndex = (indexR:number) => {
      setQuotational(i => i.filter((_, index) => index !== indexR))
    }



  return (
    <section className="flex flex-col gap-4">
      <ModernNavbar
        isTransparent={
          tab === "quot"
            ? false
            : true
        }
      />

      <TabBars error={error} quotationQty={quotational.length ?? 0} tab={(i) => setTab(i)}/>

      {
        tab === "home"
          ? <HomePages error={error} currentQuots={(i) => handleSelectQuotation(i)} service={service} data={data} isLoading={isLoading}/>
          : tab === "check"
            ? <RealTime service={service} pricing={data}/>
            : <Quotation quotation={quotational} callback={(i) => setQuotational(i)}/>
      }


      <PWAInstaller />
    </section>
  );
}
