"use client";

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
import QuotationTab from "@/components/quotation-tab";
import QuotationComponent from "@/components/quotation";
import { SilverPage } from "@/components/home-tabs/silver";
import { XAGModel } from "./models/XAG-Model";
import { PlatinumPage } from "@/components/home-tabs/platinum";
import { PalladiumPage } from "@/components/home-tabs/palladium";

export default function Home() {
  const fetcher = (url: string) => fetch("/api/gold").then((res) => res.json());
  const fetchXAG = (url: string) => fetch("/api/xag").then((res) => res.json());
  const { data, error, isLoading, isValidating } = useSWR<PriceDto>(
    "/api/gold",
    fetcher
  );
  const {
    data: xagData,
    error: xagError,
    isLoading: xagIsLoading,
    isValidating: xagIsValidating,
  } = useSWR<XAGModel>("/api/xag", fetchXAG);
  let service = 0.0656;

  const [tab, setTab] = React.useState<string>("home");
  const [quotational, setQuotational] = React.useState<QuotationModel[]>([]);
  const [quotTab, setQuottab] = React.useState<boolean>(true);
  const [pQuot, setPQout] = React.useState<QuotationModel[]>([]);

  const handleSelectQuotation = (currentQuot?: QuotationModel) => {
    if (currentQuot != null) setQuotational([...quotational, currentQuot!]);
  };

  const handleDropIndex = (indexR: number) => {
    setQuotational((i) => i.filter((_, index) => index !== indexR));
  };

  const handleSave = () => {
    setPQout(quotational ?? []);
    //setQuotational([]);
  };

  const handleBackTab = () => {
    setTab("home");
    setPQout([]);
  };

  return (
    <section className="flex flex-col  gap-4">
      <ModernNavbar
        isTransparent={
          tab === "quot" || tab === "quote" || tab === "check" ? false : true
        }
      />

      <TabBars
        error={error}
        quotationQty={quotational.length ?? 0}
        tab={(i) => setTab(i)}
      />

      {pQuot.length > 0 ? (
        <QuotationComponent items={pQuot} onChange={() => handleBackTab()} />
      ) : tab === "home" ? (
        <HomePages
          error={error}
          currentQuots={(i) => handleSelectQuotation(i)}
          service={service}
          data={data}
          isLoading={isLoading}
        />
      ) : tab === "silver" ? (
        <SilverPage
          error={error}
          currentQuots={(i) => handleSelectQuotation(i)}
          service={service}
          data={xagData}
          isLoading={isLoading}
        />
      ) : tab === "platinum" ? (
        <PlatinumPage
          error={error}
          currentQuots={(i) => handleSelectQuotation(i)}
          service={service}
          isLoading={isLoading}
        />
      ) : tab === "palladium" ? (
        <PalladiumPage
          error={error}
          currentQuots={(i) => handleSelectQuotation(i)}
          service={service}
          isLoading={isLoading}
        />
      ) : tab === "check" ? (
        <RealTime service={service} pricing={data} />
      ) : (
        <Quotation
          quotation={quotational}
          callback={(i) => setQuotational(i)}
        />
      )}

      <QuotationTab
        isMinimized={quotTab}
        onMinimize={() => setQuottab(!quotTab)}
        quotation={quotational}
        callback={(i) => setQuotational(i)}
        trigger={() => handleSave()}
      />
    </section>
  );
}
