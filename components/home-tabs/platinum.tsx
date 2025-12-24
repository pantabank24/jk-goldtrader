"use client";

import { title } from "@/components/primitives";
import { Input } from "@heroui/input";
import {
  Select,
  SelectItem,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  CircularProgress,
  addToast,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import useSWR from "swr";
import Image from "next/image";
import { Image as HImage } from "@heroui/image";
import { BannerSlider } from "@/components/banner-slide";
import Marquee from "react-fast-marquee";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronsDown,
  ChevronUp,
  Construction,
  FilePlus,
  TicketPlus,
} from "lucide-react";
import { PriceDto } from "@/app/models/Models";
import { QuotationModel } from "@/app/models/Quotations";
import QuotationComponent from "../quotation";
import AddToHomeScreenPrompt from "../AddToHomeScreenPrompt";
import toast, { Toaster } from "react-hot-toast";
import { number } from "framer-motion";
import { blogs } from "@/app/blog/blogs";
import { formatNumber } from "@/app/utils/format-number";
import { HomeBody } from "../homeBody";

interface Props {
  isLoading: boolean;
  service: number;
  currentQuots: (data?: QuotationModel) => void;
  error?: any;
}
export const PlatinumPage = ({
  isLoading,
  service,
  currentQuots,
  error,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [blog, setBlog] = React.useState<any>();

  const [XPTPrice, setXPTPrice] = React.useState<string | null>("0");
  const [percent, setPercent] = React.useState("90");
  const [gram, setGram] = React.useState<string | null>("100");
  const [calc, setCalc] = React.useState(0);

  const [currentQuot, setCurrentQuot] = useState<QuotationModel>();

  useEffect(() => {
    calcPrice();
  }, [gram, percent, XPTPrice]);

  const calcPrice = () => {
    if (gram == "") {
      setGram(null);
    }

    var PlatinumPrice = XPTPrice == "" ? 0 : parseFloat(XPTPrice ?? "0");

    var cal =
      (PlatinumPrice / 1000) *
      (parseFloat(percent == "" ? "0" : percent) / 100) *
      parseFloat(gram ?? "0");
    setCalc(cal < 0 ? 0 : cal);
    setCurrentQuot({
      goldType: "แพลตินัมแท่ง",
      goldPrice: PlatinumPrice,
      weightBaht: 0,
      percentage: parseFloat(percent),
      laborCost: parseFloat(gram ?? "0"),
      costPerBaht: cal / parseFloat(gram ?? "0"),
      totalAmount: cal,
    });
  };

  const validateXPTPriceInput = (i: string) => {
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) < 0) {
        setXPTPrice("0");
      } else {
        setXPTPrice(i);
      }
    }
  };

  const validateGramInput = (i: string) => {
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

  const validatePercentInput = (i: string) => {
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) > 999) {
        setPercent("999");
      } else if (parseInt(i) < 0 || i == "") {
        setPercent("");
      } else {
        setPercent(i);
      }
    }
  };

  const handleQuote = () => {
    currentQuots(currentQuot);
    toast.dismiss();
    toast(
      `คุณได้เพิ่มรายการ ${currentQuot?.goldType} ${currentQuot?.percentage}% น้ำหนัก ${currentQuot?.laborCost} กรัม ราคาประเมิน ${currentQuot?.totalAmount.toLocaleString()} บาท กรุณาตรวจสอบในเมนูใบเสนอราคา`,
      {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      }
    );
  };

  return (
    <section className="flex flex-col  gap-4 transition-all duration-300 ">
      <BannerSlider />
      <div>
        <div className="max-lg:hidden inline-block  text-center justify-center mb-5 lg:mt-10 w-full ">
          <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            ประเมินราคาแพลตินัม
          </span>
        </div>

        <div className=" flex flex-col mx-4 items-center">
          {error ? (
            <div className=" px-10 flex flex-row mt-3 h-40 w-full max-w-96 border-2 border-yellow-600 bg-gradient-to-b from-orange-950 to-[#14100b] rounded-2xl justify-center items-center">
              <Construction size={90} color="#ab7436" />
              <div className=" flex flex-col ml-2">
                <span className="text-lg text-[#ab7436] font-bold">
                  ไม่สามารถคำนวณได้ตอนนี้
                </span>
                <span className="text-xs text-[#ab7436] font-bold">
                  ขณะนี้ตลาดทองอาจปิด กรุณาลองใหม่อีกครั้งเมื่อตลาดเปิด
                  ขออภัยในความไม่สะดวก
                </span>
              </div>
            </div>
          ) : (
            <div className=" grid grid-cols-2  lg:grid-cols-5 gap-x-4 gap-y-2 items-start justify-center">
              <iframe
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_platinum&symbol=OANDA%3AXPTUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
                className=" row-span-2 col-span-3 flex w-full rounded-3xl h-full max-lg:hidden"
                height="500"
                scrolling="no"
              ></iframe>

              <div className=" lg:hidden col-span-2 flex flex-row justify-center items-center">
                <span className=" font-bold text-2xl bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent mb-1  ">
                  แพลตินัม
                </span>
              </div>

              <div className=" col-span-2 flex flex-col w-full justify backdrop-blur-xl border border-white/20 bg-gradient-to-b from-white/5 to-white/10 px-3 py-4 rounded-3xl ">
                <div className=" gap-3 flex flex-col items-center">
                  <div className={`flex items-center w-full gap-2`}>
                    <div className={`flex items-center w-full gap-2`}>
                      <Input
                        endContent={<div className=" text-xs">บาท</div>}
                        label={
                          <div className=" bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent font-bold">
                            ราคาแพลตินัม
                          </div>
                        }
                        classNames={{
                          inputWrapper:
                            "backdrop-blur-xl border border-white/10",
                        }}
                        size="lg"
                        className=" w-full text-base"
                        step="1"
                        type="text"
                        inputMode="decimal"
                        min="0"
                        max="100"
                        value={XPTPrice ?? "10000"}
                        onValueChange={(e) => validateXPTPriceInput(e)}
                      />
                    </div>
                    <Input
                      endContent={<div className=" text-xs">%</div>}
                      label={
                        <div className=" bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent font-bold">
                          เปอร์เซ็นต์ (%)
                        </div>
                      }
                      classNames={{
                        inputWrapper: "backdrop-blur-xl border border-white/10",
                      }}
                      size="lg"
                      className=" w-full text-base"
                      step="1"
                      type="text"
                      inputMode="decimal"
                      min="0"
                      max="100"
                      value={percent ?? ""}
                      onValueChange={(e) => validatePercentInput(e)}
                    />
                  </div>

                  <div className={`flex items-center w-full gap-2`}>
                    <Input
                      endContent={<div className=" text-xs">กรัม</div>}
                      label={
                        <div className=" bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent font-bold">
                          น้ำหนักแพลตินัม
                        </div>
                      }
                      classNames={{
                        inputWrapper: "backdrop-blur-xl border border-white/10",
                        label: "text-red-500 !important",
                      }}
                      size="lg"
                      className=" flex w-full  "
                      step="1"
                      type="text"
                      inputMode="decimal"
                      min="0"
                      value={gram ?? ""}
                      onValueChange={(e) => validateGramInput(e)}
                    />

                    {isLoading == false ? (
                      <button
                        onClick={() => handleQuote()}
                        className=" w-full h-16 justify-center backdrop-blur-xl border  border-white/20 bg-gradient-to-b from-blue-700/5 to-blue-800/30 text-white  rounded-xl transition-all duration-200 hover:scale-105 flex flex-row items-center "
                      >
                        <FilePlus size={20} />
                        <span className=" pl-2 text-xs">
                          เพิ่มลงในใบเสนอราคา
                        </span>
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3 flex">
                  <div className=" flex flex-col w-full items-center justify-center backdrop-blur-xl border border-white/20  text-white bg-gradient-to-b from-black/80 to-orange-950/70 rounded-2xl py-3">
                    <span className=" flex text-center text-sm">
                      ราคาประเมิน
                    </span>
                    <Skeleton isLoaded={!isLoading} className="rounded-lg">
                      <span className="bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold truncate text-3xl">
                        {calc > 9999999
                          ? formatNumber(calc) + "บาท"
                          : calc.toLocaleString(`th-TH`, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }) + " บาท"}{" "}
                      </span>
                    </Skeleton>

                    {/* <span className=" font-normal text-xs mt-2">ประเมินราคาทองคำแบบเรียลไทม์ด้วยระบบอัตโนมัติ</span> */}
                    <span className=" font-normal text-xs">
                      อัพเดทราคาทุก 30 วินาที
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            as="a"
            href="https://lin.ee/XukDRz8"
            className=" hover:scale-105 backdrop-blur-xl border-2 border-white/20 flex h-14 w-56 px-10 mt-3  bg-gradient-to-b from-green-500 to-green-700 "
            radius="full"
          >
            <img
              alt=""
              width={40}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/LINE_New_App_Icon_%282020-12%29.png/500px-LINE_New_App_Icon_%282020-12%29.png"
            />
            <div>สนใจซื้อขาย คลิกที่นี่</div>
          </Button>
        </div>

        <div className="inline-block text-center justify-center w-full mt-10 mb-7 flex flex-col"></div>

        <HomeBody pageType="platinum" />

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          scrollBehavior="inside"
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {blog.title}
                </ModalHeader>
                <ModalBody>
                  <img
                    className="w-full h-64 object-cover rounded-3xl"
                    alt="author"
                    src={blog.img}
                  />
                  <span className="whitespace-pre-line">
                    {blog.description}
                  </span>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="bg-gradient-to-b from-yellow-500 to-yellow-700  font-bold  w-full"
                    onPress={onClose}
                  >
                    ออก
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
};
