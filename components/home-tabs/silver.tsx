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
import { XAGModel } from "@/app/models/XAG-Model";
import { formatNumber } from "@/app/utils/format-number";

interface Props {
  data?: XAGModel;
  isLoading: boolean;
  service: number;
  currentQuots: (data?: QuotationModel) => void;
  error?: any;
}
export const SilverPage = ({
  data,
  isLoading,
  service,
  currentQuots,
  error,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [blog, setBlog] = React.useState<any>();

  const [xagPrice, setXagPrice] = React.useState<string | null>();
  const [percent, setPercent] = React.useState("90");
  const [gram, setGram] = React.useState<string | null>("1");
  const [calc, setCalc] = React.useState(0);

  const [currentQuot, setCurrentQuot] = useState<QuotationModel>();

  useEffect(() => {
    calcPrice();
  }, [data, gram, percent, xagPrice]);

  const calcPrice = () => {
    if (gram == "") {
      setGram(null);
    }

    var silverPrice =
      (xagPrice ? parseFloat(xagPrice) : null) ?? data?.buy ?? 0;

    var cal =
      ((silverPrice - 2000) *
        (parseFloat(percent == "" ? "0" : percent) / 100) *
        100) /
      1000;
    setCalc(cal < 0 ? 0 : cal);
    setCurrentQuot({
      goldType: "เงินแท่ง",
      goldPrice: silverPrice,
      weightBaht: 0,
      percentage: parseFloat(percent),
      laborCost: parseFloat(gram ?? "0"),
      costPerBaht: cal / parseFloat(gram ?? "0"),
      totalAmount: cal,
    });
  };

  const validateXAGPriceInput = (i: string) => {
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) < 0) {
        setXagPrice("0");
      } else {
        setXagPrice(i);
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
      if (parseInt(i) > 100) {
        setPercent("100");
      } else if (parseInt(i) < 0) {
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
            ประเมินราคาแท่งเงิน
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
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_8d6d1&symbol=FOREXCOM%3AXAGUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
                className=" row-span-2 col-span-3 flex w-full rounded-3xl h-full max-lg:hidden"
                height="500"
                scrolling="no"
              ></iframe>
              <div className=" col-span-2 flex flex-col h-full gap-y-4 w-full items-center">
                <div className=" flex w-full text-center flex-col justify-center rounded-3xl py-2 px-5 backdrop-blur-xl border border-yellow-300/20 bg-gradient-to-b from-white/5 to-[#14100b]   ">
                  <span className=" font-bold text-2xl bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent mb-1  ">
                    แท่งเงิน 99.99%
                  </span>
                  <div className=" grid grid-cols-2  gap-x-4">
                    <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-red-900 flex flex-col items-center py-5 rounded-2xl h-20 justify-center">
                      {isLoading ? (
                        <CircularProgress
                          aria-label="Loading..."
                          color="warning"
                        />
                      ) : (
                        <div className=" flex flex-col items-center ">
                          <span className=" font-bold text-sm bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            ราคารับซื้อ (บาท)
                          </span>
                          <span className=" text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold flex flex-row">
                            {(data?.buy ?? 0).toLocaleString(`th-TH`, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-red-900 flex flex-col items-center py-5 rounded-2xl h-20 justify-center">
                      {isLoading ? (
                        <CircularProgress
                          aria-label="Loading..."
                          color="warning"
                        />
                      ) : (
                        <div className=" flex flex-col items-center">
                          <span className=" font-bold text-sm bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent  ">
                            ราคาขาย (บาท)
                          </span>
                          <span className=" text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
                            {(data?.sell ?? 0).toLocaleString(`th-TH`, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className=" flex w-full items-center justify-center gap-x-2 mt-2">
                    <div
                      className={`bg-white/10 border-white/10 px-3 py-1 w-full backdrop-blur-xl border rounded-full flex flex-row items-center justify-center gap-x-2`}
                    >
                      {(data?.previous ?? 0) > 0 ? (
                        <ArrowUp color={"#11ff00"} size={14} />
                      ) : (
                        <ArrowDown color={"red"} size={14} />
                      )}
                      <div className="  font-bold text-xs">
                        {data?.previous}
                      </div>
                    </div>
                  </div>

                  <span className=" font-normal text-xs mt-2 mb-1  flex flex-row  justify-center">
                    อัปเดท :
                    <Skeleton
                      isLoaded={!isLoading}
                      className="h-3  rounded-lg ml-2"
                    >
                      {moment(data?.timestamp)
                        .locale("th")
                        .format("D MMMM YYYY HH:mm")}{" "}
                      ครั้งที่ {data?.round}
                    </Skeleton>
                  </span>
                </div>
              </div>

              <div className=" col-span-2 flex flex-col w-full justify backdrop-blur-xl border border-white/20 bg-gradient-to-b from-white/5 to-white/10 px-3 py-4 rounded-3xl ">
                <div className=" gap-3 flex flex-col items-center">
                  <div className={`flex items-center w-full gap-2`}>
                    <div className={`flex items-center w-full gap-2`}>
                      <Input
                        endContent={<div className=" text-xs">บาท</div>}
                        label={
                          <div className=" bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent font-bold">
                            ราคาเงิน
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
                        value={xagPrice ?? data?.buy.toString()}
                        onValueChange={(e) => validateXAGPriceInput(e)}
                      />
                    </div>
                    <Input
                      endContent={<div className=" text-xs">%</div>}
                      label={
                        <div className=" bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent font-bold">
                          เปอร์เซ็นต์เงิน (%)
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
                          น้ำหนักเงิน
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
            href="https://line.me/R/ti/p/@446pxqyk?ts=04201136&oat_content=url"
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

        <div className="inline-block text-center justify-center w-full mt-20 mb-7 flex flex-col"></div>

        <div className=" lg:hidden flex flex-col gap-y-4 w-full items-center justify-center px-5">
          <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            กราฟเงินตอนนี้
          </span>
          <iframe
            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_8d6d1&symbol=FOREXCOM%3AXAUUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
            className=" flex w-full rounded-3xl lg:w-1/2"
            height="500"
            scrolling="no"
          ></iframe>
        </div>

        <div className="relative flex w-full py-16 bg-white/5 mt-10 flex-col items-center px-5">
          <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-t from-transparent to-black" />
          <span className="  text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
            บทความ
          </span>
          <span className=" mb-10 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold ">
            ข่าวสารประชาสัมพันธ์จาก JK Goldtrader
          </span>

          <div className=" w-full lg:w-1/2">
            {blogs.map((i, index) => (
              <div
                key={index}
                className=" flex flex-col xl:flex-row rounded-2xl backdrop-blur-xl border border-white/20 bg-gradient-to-b from-white/5 to-white/10 items-center justify-center "
              >
                <img
                  className="h-72 max-xl:w-full object-cover rounded-xl "
                  alt="fischer"
                  src={i.img}
                />
                <div className=" flex flex-col items-end justify-center py-4 px-4">
                  <span className=" w-full h-full text-sm whitespace-pre-line ">
                    {i.description}
                  </span>
                  <Button
                    className="  font-bold backdrop-blur-xl border border-white/20 bg-gradient-to-b from-transparent to-yellow-500/50"
                    onPress={() => {}}
                  >
                    อ่านเพิ่มเติม
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className=" w-full lg:w-1/2 mt-20 md:mt-32  flex items-center justify-center flex-col">
            <span className="  text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold mb-10">
              พิกัดร้าน
            </span>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.1906687314067!2d100.64438107586528!3d13.767372496931236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d61e658c0eb4f%3A0xa6559716dcd55c86!2z4LiI4LmI4Liy4LiE4Li04LiHIOC4m-C4suC4geC4nuC4meC4seC4hw!5e0!3m2!1sen!2sth!4v1751569935480!5m2!1sen!2sth"
              width="600"
              height="450"
              loading="lazy"
              className=" rounded-3xl w-full"
            ></iframe>
          </div>
        </div>

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
