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
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { BannerSlider } from "@/components/banner-slide";
import { ArrowDown, ArrowUp, Construction, FilePlus } from "lucide-react";
import { PriceDto } from "@/app/models/Models";
import { QuotationModel } from "@/app/models/Quotations";
import toast from "react-hot-toast";
import { blogs } from "@/app/blog/blogs";
import { HomeBody } from "../homeBody";

interface Props {
  data?: PriceDto;
  isLoading: boolean;
  service: number;
  currentQuots: (data?: QuotationModel) => void;
  error?: any;
}
export const HomePages = ({
  data,
  isLoading,
  service,
  currentQuots,
  error,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [option, setOption] = React.useState("3");
  const [gram, setGram] = React.useState<string | null>("1");
  const [plus, setPlus] = React.useState<string | null>("0");
  const [percent, setPercent] = React.useState("90");
  const [gPrice, setGPrice] = React.useState<string | null>();
  const [calc, setCalc] = React.useState(0);
  const [blog, setBlog] = React.useState<any>();

  const [currentQuot, setCurrentQuot] = useState<QuotationModel>();

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

  useEffect(() => {
    calcPrice();
  }, [data, gram, plus, percent, option, gPrice]);

  const calcPrice = () => {
    if (gram == "") {
      setGram(null);
    }

    var goldPrice =
      (gPrice ? parseFloat(gPrice) : null) ?? data?.gold965.ask ?? 0;
    var gramPrice =
      ((gPrice ? parseFloat(gPrice) : null) ?? data?.gold965.ask ?? 0) / 15.2;
    switch (option) {
      case "1":
        setCalc(gramPrice * parseFloat(gram ?? "0"));
        setCurrentQuot({
          goldType: "ทองคำแท่ง",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 96.5,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat(gramPrice.toFixed(2)),
          totalAmount: parseFloat(
            (gramPrice * parseFloat(gram ?? "0")).toFixed(2)
          ),
        });
        break;
      case "2":
        setCalc(goldPrice * service * 0.965 * parseFloat(gram ?? "0"));
        setCurrentQuot({
          goldType: "ทองรูปพรรณ",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 96.5,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat((goldPrice * service * 0.965).toFixed(2)),
          totalAmount: parseFloat(
            (goldPrice * service * 0.965 * parseFloat(gram ?? "0")).toFixed(2)
          ),
        });
        break;
      case "3":
        var calcs = 0;
        calcs =
          (goldPrice + parseFloat(plus == "" ? "0" : (plus ?? "0"))) *
          service *
          (parseFloat(percent) / 100) *
          parseFloat(gram ?? "0");
        setCurrentQuot({
          goldType: "ทองหลอม",
          goldPrice: goldPrice,
          weightBaht: parseFloat(plus == "" ? "0" : (plus ?? "0")),
          percentage: parseFloat(percent),
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat(
            (
              (goldPrice + parseFloat(plus == "" ? "0" : (plus ?? "0"))) *
              service *
              (parseFloat(percent) / 100)
            ).toFixed(2)
          ),
          totalAmount: parseFloat(
            (
              (goldPrice + parseFloat(plus == "" ? "0" : (plus ?? "0"))) *
              service *
              (parseFloat(percent) / 100) *
              parseFloat(gram ?? "0")
            ).toFixed(2)
          ),
        });
        setCalc(calcs);
        break;
      case "4":
        var calcs =
          goldPrice *
          service *
          (parseFloat(percent) / 100) *
          parseFloat(gram ?? "0");
        setCalc(calcs);
        setCurrentQuot({
          goldType: "กรอบ/ตลับทอง",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: parseFloat(percent),
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat(
            (goldPrice * service * (parseFloat(percent) / 100)).toFixed(2)
          ),
          totalAmount: calcs,
        });
        break;
      case "5":
        var calcs = goldPrice * service * 0.375 * parseFloat(gram ?? "0");
        setCalc(calcs);
        setCurrentQuot({
          goldType: "ทอง 9K",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 37.5,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat((goldPrice * service * 0.375).toFixed(2)),
          totalAmount: calcs,
        });
        break;
      case "6":
        var calcs = goldPrice * service * 0.585 * parseFloat(gram ?? "0");
        setCalc(calcs);
        setCurrentQuot({
          goldType: "ทอง 14K",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 58.5,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat((goldPrice * service * 0.585).toFixed(2)),
          totalAmount: calcs,
        });
        break;
      case "7":
        var calcs = goldPrice * service * 0.75 * parseFloat(gram ?? "0");
        setCalc(calcs);
        setCurrentQuot({
          goldType: "ทอง 18K",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 75,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat((goldPrice * service * 0.75).toFixed(2)),
          totalAmount: calcs,
        });
        break;
      case "8":
        var calcs =
          goldPrice *
          service *
          (parseFloat(percent) / 100) *
          parseFloat(gram ?? "0");
        setCalc(calcs);
        setCurrentQuot({
          goldType: "อื่น ๆ",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: parseFloat(percent),
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: goldPrice * service * (parseFloat(percent) / 100),
          totalAmount: calcs,
        });
        break;
      default:
        setCalc(2);
        break;
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

  const validateGPriceInput = (i: string) => {
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) < 0) {
        setGPrice("0");
      } else {
        setGPrice(i);
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

  const validatePlusInput = (i: string) => {
    if (parseFloat(i) > 999999) {
      i = "999999";
    }
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) < 0) {
        setPlus("0");
      } else {
        setPlus(i);
      }
    }
  };

  const handleOptionChange = (val: React.ChangeEvent<HTMLSelectElement>) => {
    if (val.target.value !== option && val.target.value) {
      setOption(val.target.value);
    }
  };

  function formatNumber(num: number): string {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " พันล้าน";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + " ล้าน";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + " พัน";
    }
    return num.toString();
  }

  const handleSetBlog = (index: number) => {
    setBlog(blogs[index]);
    onOpen();
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
            ประเมินราคาทองคำ
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
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_8d6d1&symbol=FOREXCOM%3AXAUUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
                className=" row-span-2 col-span-3 flex w-full rounded-3xl h-full max-lg:hidden relative z-0 pointer-events-none"
                height="500"
                scrolling="no"
              ></iframe>
              <div className=" col-span-2 flex flex-col h-full gap-y-4 w-full items-center">
                <div className=" flex w-full text-center flex-col justify-center rounded-3xl py-2 px-5 backdrop-blur-xl border border-yellow-300/20 bg-gradient-to-b from-white/5 to-[#14100b]   ">
                  <span className=" font-bold text-2xl bg-gradient-to-b from-yellow-300 to-yellow-900 bg-clip-text text-transparent mb-1  ">
                    ทองคำเเท่ง 96.5%
                  </span>
                  <div className=" grid grid-cols-2  gap-x-4">
                    <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-[#0f2443] flex flex-col items-center py-5 rounded-2xl h-20 justify-center">
                      {isLoading ? (
                        <CircularProgress
                          aria-label="Loading..."
                          color="warning"
                        />
                      ) : (
                        <div className=" flex flex-col items-center ">
                          <span className=" font-normal text-sm text-yellow-500">
                            ราคารับซื้อ (บาท)
                          </span>
                          <span className=" text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold flex flex-row">
                            {(data?.gold965.ask ?? 0).toLocaleString(`th-TH`, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-[#0f2443] flex flex-col items-center py-5 rounded-2xl h-20 justify-center">
                      {isLoading ? (
                        <CircularProgress
                          aria-label="Loading..."
                          color="warning"
                        />
                      ) : (
                        <div className=" flex flex-col items-center">
                          <span className=" font-normal text-sm text-yellow-500 ">
                            ราคาขาย (บาท)
                          </span>
                          <span className=" text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
                            {(data?.gold965.bid ?? 0).toLocaleString(`th-TH`, {
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
                      className={`bg-white/10 border-white/10 px-3 py-1 w-full backdrop-blur-xl border  rounded-full flex flex-row items-center justify-center gap-x-2`}
                    >
                      {(data?.gold965.change_today ?? 0) > 0 ? (
                        <ArrowUp color={"#11ff00"} size={14} />
                      ) : (
                        <ArrowDown color={"red"} size={14} />
                      )}
                      <div className="  font-bold text-xs">
                        {data?.gold965.change_today}
                      </div>
                    </div>

                    <div
                      className={`bg-white/10 border-white/10 px-3 py-1 w-full backdrop-blur-xl border rounded-full flex flex-row items-center justify-center gap-x-2`}
                    >
                      {(data?.gold965.change_yesterday ?? 0) > 0 ? (
                        <ArrowUp color={"#11ff00"} size={14} />
                      ) : (
                        <ArrowDown color={"red"} size={14} />
                      )}
                      <div className="  font-bold text-xs">
                        วันนี้ {data?.gold965.change_yesterday}
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
                        .format("D MMMM YYYY HH:mm")}
                    </Skeleton>
                  </span>
                </div>
              </div>

              <div className=" col-span-2 flex flex-col w-full justify backdrop-blur-xl border border-white/20 bg-gradient-to-b from-white/5 to-white/10 px-3 py-4 rounded-3xl ">
                <div className=" gap-3 flex flex-col items-center">
                  <div className={`flex items-center w-full gap-2`}>
                    <div className="flex-1">
                      {/* <span className=" bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold">เปอร์เซ็นต์ทอง (%)</span> */}
                      <Input
                        endContent={<div className=" text-xs">บาท</div>}
                        label={
                          <div className=" bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text text-transparent font-bold">
                            ราคาทอง
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
                        value={gPrice ?? data?.gold965.ask.toString()}
                        onValueChange={(e) => validateGPriceInput(e)}
                      />
                    </div>
                    <div className="flex-1">
                      <Select
                        onChange={(e) => handleOptionChange(e)}
                        className=" w-full"
                        selectedKeys={option}
                        size="lg"
                        label={
                          <div className=" bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text text-transparent font-bold">
                            เลือกประเภททอง
                          </div>
                        }
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

                  <div className={`flex items-center w-full gap-2`}>
                    {option === "8" || option === "3" || option === "4" ? (
                      <div className="flex-1">
                        {/* <span className=" bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold">เปอร์เซ็นต์ทอง (%)</span> */}
                        <Input
                          endContent={<div className=" text-xs">%</div>}
                          label={
                            <div className=" bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text text-transparent font-bold">
                              เปอร์เซ็นต์ทอง (%)
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
                          value={percent}
                          onValueChange={(e) => validatePercentInput(e)}
                        />
                      </div>
                    ) : null}

                    {option === "3" ? (
                      <div className="flex-1">
                        {/* <span className=" bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold">ราคาบวก</span> */}
                        <Input
                          endContent={<div className=" text-xs">บาท</div>}
                          label={
                            <div className=" bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text text-transparent font-bold">
                              ราคาบวก
                            </div>
                          }
                          classNames={{
                            inputWrapper:
                              "backdrop-blur-xl border border-white/10",
                            label: "text-red-500 !important",
                          }}
                          size="lg"
                          className=" w-full  "
                          step="1"
                          type="text"
                          inputMode="decimal"
                          min="0"
                          value={plus ?? ""}
                          onValueChange={(e) => validatePlusInput(e)}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className={`flex items-center w-full gap-2`}>
                    <Input
                      endContent={<div className=" text-xs">กรัม</div>}
                      label={
                        <div className=" bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text text-transparent font-bold">
                          น้ำหนักทอง
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

        <div className="inline-block text-center justify-center w-full mt-20 mb-7 flex flex-col"></div>

        <HomeBody />

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
