'use client'

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
import useSWR from 'swr'
import Image from "next/image";
import { Image as HImage } from "@heroui/image";
import { BannerSlider } from "@/components/banner-slide";
import Marquee from "react-fast-marquee";
import { ArrowDown, ArrowUp, ChevronDown, ChevronLeft, ChevronsDown, ChevronUp, Construction, Equal, FilePlus, TicketPlus } from "lucide-react";
import { PriceDto } from "@/app/models/Models";
import { QuotationModel } from "@/app/models/Quotations";
import QuotationComponent from "../quotation";

interface Props {
    data?: PriceDto,
    isLoading: boolean,
    service: number,
    currentQuots: (data?:QuotationModel) => void,
    error?: any
}
export const HomePages = ({data, isLoading, service, currentQuots, error}:Props) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [option, setOption] = React.useState("3");
  const [gram, setGram] = React.useState<string | null>("1");
  const [plus, setPlus] = React.useState<string | null>("0");
  const [percent, setPercent] = React.useState("90");
  const [calc, setCalc] = React.useState(0);
  const [blog, setBlog] = React.useState<any>();
  

  const [toggle, setToggle] = useState(false)
  const [currentQuot, setCurrentQuot] = useState<QuotationModel>();
  const [hidden, setHidden] = useState(false);

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
    calcPrice()
  }, [data, gram, plus, percent, option])

  const handleSelectionChange = (e: any) => {
    setOption(e.target.value);
  };

  const calcPrice = () => {

    if (gram == "") {
      setGram(null)
    }

    var goldPrice = data?.gold965.ask ?? 0
    var gramPrice = (data?.gold965.ask ?? 0) / 15.2;
    switch (option) {
      case "1":
        setCalc((gramPrice * parseFloat(gram ?? "0")))
        setCurrentQuot({
          goldType: "ทองคำแท่ง",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 96.5,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat(gramPrice.toFixed(2)),
          totalAmount: parseFloat((gramPrice * parseFloat(gram ?? "0")).toFixed(2))
        })
        break;
      case "2":
        setCalc((goldPrice * service * 0.97 * parseFloat(gram ?? "0")))
         setCurrentQuot({
          goldType: "ทองรูปพรรณ",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 96.5,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat((goldPrice * service * 0.97).toFixed(2)),
          totalAmount: parseFloat((goldPrice * service * 0.97 * parseFloat(gram ?? "0")).toFixed(2))
        })
        break;
      case "3":
        var calcs = 0
        if (parseFloat(percent) > 99 && gram != null) {
          calcs = (goldPrice + parseFloat(plus == "" ? "0" : plus ?? "0")) * service * (parseFloat(percent) / 100) * parseFloat(gram ?? "0")
          setCurrentQuot({
            goldType: "ทองหลอม",
            goldPrice: goldPrice,
            weightBaht: parseFloat(plus == "" ? "0" : plus ?? "0"),
            percentage: parseFloat(percent),
            laborCost: parseFloat(gram ?? "0"),
            costPerBaht: parseFloat(((goldPrice + parseFloat(plus == "" ? "0" : plus ?? "0")) * service * (parseFloat(percent) / 100)).toFixed(2)),
            totalAmount: parseFloat(((goldPrice + parseFloat(plus == "" ? "0" : plus ?? "0")) * service * (parseFloat(percent) / 100) * parseFloat(gram ?? "0")).toFixed(2))
          })
        } else if (parseFloat(percent) > 30 && gram != null) {
          calcs = (goldPrice + parseFloat(plus == "" ? "0" : plus ?? "0")) * service * (parseFloat(percent) / 100) * parseFloat(gram ?? "0")
          setCurrentQuot({
            goldType: "ทองหลอม",
            goldPrice: goldPrice,
            weightBaht: parseFloat(plus == "" ? "0" : plus ?? "0"),
            percentage: parseFloat(percent),
            laborCost: parseFloat(gram ?? "0"),
            costPerBaht: parseFloat(((goldPrice + parseFloat(plus == "" ? "0" : plus ?? "0")) * service * (parseFloat(percent) / 100)).toFixed(2)),
            totalAmount: parseFloat(((goldPrice + parseFloat(plus == "" ? "0" : plus ?? "0")) * service * (parseFloat(percent) / 100) * parseFloat(gram ?? "0")).toFixed(2))
          })
        } else if (parseFloat(percent) <= 30 && gram != null) {
          calcs = goldPrice * service * (parseFloat(percent) / 100) * parseFloat(gram ?? "0")
          setCurrentQuot({
            goldType: "ทองหลอม",
            goldPrice: goldPrice,
            weightBaht: parseFloat(plus == "" ? "0" : plus ?? "0"),
            percentage: parseFloat(percent),
            laborCost: parseFloat(gram ?? "0"),
            costPerBaht: parseFloat((goldPrice * service * (parseFloat(percent) / 100)).toFixed(2)),
            totalAmount: parseFloat((goldPrice * service * (parseFloat(percent) / 100) * parseFloat(gram ?? "0")).toFixed(2))
          })
        }
        setCalc(calcs)
        break;
      case "4":
        var calcs = goldPrice * service * (parseFloat(percent) / 100) * parseFloat(gram ?? "0")
        setCalc(calcs)
        setCurrentQuot({
          goldType: "กรอบ/ตลับทอง",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: parseFloat(percent),
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat((goldPrice * service * (parseFloat(percent) / 100)).toFixed(2)),
          totalAmount: calcs
        })
        break;
      case "5":
        var calcs = (goldPrice) * service * 0.375 * parseFloat(gram ?? "0")
        setCalc(calcs)
        setCurrentQuot({
          goldType: "ทอง 9K",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 37.5,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat(((goldPrice) * service * 0.375).toFixed(2)),
          totalAmount: calcs
        })
        break;
      case "6":
        var calcs = (goldPrice) * service * 0.585 * parseFloat(gram ?? "0")
        setCalc(calcs)
        setCurrentQuot({
          goldType: "ทอง 14K",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 58.5,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat(((goldPrice) * service * 0.585).toFixed(2)),
          totalAmount: calcs
        })
        break;
      case "7":
        var calcs = (goldPrice) * service * 0.75 * parseFloat(gram ?? "0")
        setCalc(calcs)
        setCurrentQuot({
          goldType: "ทอง 18K",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 75,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat(((goldPrice) * service * 0.75).toFixed(2)),
          totalAmount: calcs
        })
        break;
      case "8":
        var calcs = goldPrice * service * (parseFloat(percent) / 100) * parseFloat(gram ?? "0")
        setCalc(calcs)
        setCurrentQuot({
          goldType: "อื่น ๆ",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: parseFloat(percent),
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: goldPrice * service * (parseFloat(percent) / 100),
          totalAmount: calcs
        })
        break;
      default:
        setCalc(2)
        break;
    }
  }

  const validatePercentInput = (i: string) => {
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) > 100) {
        setPercent("100")
      } else if (parseInt(i) < 0) {
        setPercent("")
      } else {
        setPercent(i)
      }
    }
  }

  const validateGramInput = (i: string) => {
    if (parseFloat(i) > 999999) {
      i = '999999'
    }
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) < 0) {
        setGram("")
      } else {
        setGram(i)
      }
    }
  }

  const validatePlusInput = (i: string) => {
    if (parseFloat(i) > 999999) {
      i = '999999'
    }
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) < 0) {
        setPlus("0")
      } else {
        setPlus(i)
      }
    }
  }

  const handleOptionChange = (val: React.ChangeEvent<HTMLSelectElement>) => {
    if (val.target.value !== option && val.target.value) {
      setOption(val.target.value)
    }
  }

  function formatNumber(num: number): string {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + ' พันล้าน';
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' ล้าน';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + ' พัน';
    }
    return num.toString();
  }

  const blogs = [
    {
      title: "ราคาประเมินทองคำของเว็ปไซต์",
      author_img: "/images/owner.png",
      author_name: "จ่าคิง ปากพนัง",
      description: "ราคาทองคำที่ทางเราประเมินให้ไป เป็นราคาตามเปอร์เซ็นจริงของทองคำที่ท่านใส่ข้อมูลมา ทองคำบางประเภท เช่น ทองคำผสมที่ผ่านการหลอมรวมมา จะมีการบวกให้ตั้งแต่ 500 - 1500 บาท ต่อบาท ทองทำที่ยังไม่ผ่านการหลอมเหลวรวมกับเป็นก้อน บางชิ้น อาจจะมีการหักค่าน้ำประสานทอง บางชิ้นอาจจะไม่มีการหักค่าน้ำประสานทอง ทุกอย่างขึ้นอยู่กับรูปแบบของชิ้นงาน การที่จะได้ราคาที่ถูกต้อง และแม่นยำ จำเป็นต้องนำมาให้างเราตรวจสอบโดยใช้วิธีการ X-Ray ผ่านเครื่องมือการตรวจสอบค่าโลหะ อย่างละเอียด ถึงจะแม่นยำ และได้ราคาสูงสุด ทั้งนี้ หากท่านไหนไม่สะดวกจะนำชิ้นงานของท่านเข้ามาที่ร้าน ท่านสามารถส่งรูปภาพ น้ำหนัก เบื้องต้นมาทาง Line official ของทางร้านได้เลย ทางร้านจะมีแอดมินคอยตอบคำถามเชิงลึกให้ท่านอยู่ 24 ชั่วโมงครับ ขอบคุณที่ท่านเลือกให้เราดูแลท่าน",
      img: "/images/fischer.png",
      created_at: "2025-05-11"
    },
    // {
    //   title: "🔥รู้ก่อนขายได้ตังค์เพิ่มอีกเยอะ🔥",
    //   author_img: "/images/owner.png",
    //   author_name: "จ่าคิง ปากพนัง",
    //   description: "🟢 วิธีคำนวนราคาทอง 🟢 \nราคาทองวันนี้ x 0.0656 x (% ทองจริง x น้ำหนักทอง) = ราคาทองที่จะได้รับ \n\nหน้าร้านอยู่ที่ลาดพร้าว 129 ไม่สะดวกมา โทรมาปรึกษากัน แล้วส่งพัสดุมาได้ ทางร้านยินดีดูแลให้ครับ",
    //   img: "/images/jk-manygold.png",
    //   created_at: "2025-05-11"
    // }
  ]

  const handleSetBlog = (index: number) => {
    setBlog(blogs[index])
    onOpen()
  }

  const handleQuote = () => {
    currentQuots(currentQuot)
    addToast({
          hideIcon: true,
          title: "เพิ่มลงในใบเสนอราคาเรียบร้อย",
          description: `คุณได้เพิ่มรายการ ${currentQuot?.goldType} ${currentQuot?.percentage}% น้ำหนัก ${currentQuot?.laborCost} กรัม ราคาประเมิน ${currentQuot?.totalAmount.toLocaleString()} บาท กรุณาตรวจสอบในเมนูใบเสนอราคา`,
          radius: "lg",
          classNames: {
            icon: "backdrop-blur-xl border border-white/20"
          }
        })
  }


  return (
    <section className="flex flex-col  gap-4 transition-all duration-300">

      <BannerSlider />
        <div>
            <div className="inline-block  text-center justify-center w-full ">
                <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  ประเมินราคาทองคำ
                </span>
              </div>

            <div className=" flex flex-col mx-4 items-center">              

              {
                error 
                  ? <div className=" px-10 flex flex-row mt-3 h-40 w-full max-w-96 border-2 border-yellow-600 bg-gradient-to-b from-orange-950 to-[#14100b] rounded-2xl justify-center items-center">
                    <Construction size={90} color="#ab7436" />
                    <div className=" flex flex-col ml-2">
                      <span className="text-lg text-[#ab7436] font-bold">
                        ไม่สามารถคำนวณได้ตอนนี้
                      </span>
                      <span className="text-xs text-[#ab7436] font-bold">
                        ขณะนี้ตลาดทองอาจปิด กรุณาลองใหม่อีกครั้งเมื่อตลาดเปิด ขออภัยในความไม่สะดวก
                      </span>
                    </div>
                  </div>
                  : <div className=" flex flex-col items-center justify-center">
                    <div className=" flex w-96 text-center flex-col justify-center rounded-3xl py-2 px-5 backdrop-blur-xl border border-yellow-300/20 bg-gradient-to-b from-white/5 to-[#14100b]  my-2 ">
                      <span className=" font-bold text-2xl bg-gradient-to-b from-yellow-300 to-yellow-900 bg-clip-text text-transparent mb-3  ">ทองคำเเท่ง 96.5%</span>
                      <div className=" grid grid-cols-2  gap-x-4">
                        <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-red-900 flex flex-col items-center py-5 rounded-2xl h-28 justify-center">
                          {
                            isLoading
                              ? <CircularProgress aria-label="Loading..." color="warning" />
                              : (<div className=" flex flex-col items-center ">
                                <span className=" font-normal text-sm text-yellow-500">ราคารับซื้อ</span>
                                <span className=" text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
                                  {(data?.gold965.ask ?? 0).toLocaleString(`th-TH`, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                                <span className=" font-normal text-sm text-yellow-500">บาท</span>
                              </div>)
                          }
                        </div>
                        <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-red-900 flex flex-col items-center py-5 rounded-2xl h-28 justify-center">
                          {
                            isLoading
                              ? <CircularProgress aria-label="Loading..." color="warning" />
                              : (<div className=" flex flex-col items-center">
                                <span className=" font-normal text-sm text-yellow-500 ">ราคาขาย</span>
                                <span className=" text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
                                  {(data?.gold965.bid ?? 0).toLocaleString(`th-TH`, {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                                <span className=" font-normal text-sm text-yellow-500">บาท</span>
                              </div>)
                          }
                        </div>
                      </div>

                      <div className=" flex w-full items-center justify-center gap-x-2 mt-2">
                        <div className={`bg-white/10 border-white/10 px-3 py-1 min-w-24 backdrop-blur-xl border  rounded-full flex flex-row items-center justify-center gap-x-2`}>
                          {
                            (data?.gold965.change_today ?? 0) > 0 
                              ? <ArrowUp color={'#11ff00'} size={14}/>
                              : (data?.gold965.change_today ?? 0) === 0
                                ? <Equal color="#001eff" size={14}/>
                                : <ArrowDown color={'red'} size={14}/>
                          }
                          <div className="  font-bold text-xs">{data?.gold965.change_today}</div>
                        </div>

                        <div className={`bg-white/10 border-white/10 px-3 py-1 min-w-24 backdrop-blur-xl border rounded-full flex flex-row items-center justify-center gap-x-2`}>
                          {
                            (data?.gold965.change_yesterday ?? 0) > 0 
                              ? <ArrowUp color={'#11ff00'} size={14}/>
                              : (data?.gold965.change_today ?? 0) === 0
                                ? <Equal color="#001eff" size={14}/>
                                : <ArrowDown color={'red'} size={14}/>
                          }
                          <div className="  font-bold text-xs">วันนี้ {data?.gold965.change_yesterday}</div>
                        </div>
                      </div>

                      <span className=" font-normal text-xs mt-2 mb-1  flex flex-row  justify-center">
                        อัปเดท :
                        <Skeleton isLoaded={!isLoading} className="h-3  rounded-lg ml-2">
                          {moment(data?.timestamp).locale('th').format('D MMMM YYYY HH:mm')}
                        </Skeleton>
                      </span>
                    </div>

                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-10 backdrop-blur-xl border border-white/20 bg-gradient-to-b from-white/5 to-white/10 px-10 py-5 rounded-3xl mt-5">
                      <div className=" gap-3 flex flex-col items-center">
                        <span className=" bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold">ประเภททอง</span>
                        <Select
                          aria-label="เลือกประเภททอง"
                          onChange={(e) => handleOptionChange(e)}
                          className="min-w-80"
                          selectedKeys={option}
                          size="lg"
                          classNames={{trigger: "backdrop-blur-xl border border-white/10 ", popoverContent: "backdrop-blur-xl border border-white/50 bg-white/10"}}
                        >
                          {goldTypes.map((item) => (
                            <SelectItem
                              key={item.key}

                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </Select>
                        {
                          option === "8" || option === "3" || option === "4"
                            ? <div className=" flex flex-col items-center">
                              <span className=" bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold">เปอร์เซ็นต์ทอง (%)</span>
                              <Input classNames={{inputWrapper: "backdrop-blur-xl border border-white/10 "}} size="lg" className=" min-w-80 text-base" step="1" type="text" inputMode="decimal" min="0" max="100" value={percent} onValueChange={(e) => validatePercentInput(e)} />
                            </div>
                            : null
                        }

                        {
                          option === "3"
                            ? <div className=" flex flex-col items-center">
                              <span className=" bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold">ราคาบวก</span>
                              <Input classNames={{inputWrapper: "backdrop-blur-xl border border-white/10 ", }} size="lg" className=" min-w-80 text-base " step="1" type="text" inputMode="decimal" min="0" value={plus ?? ""} onValueChange={(e) => validatePlusInput(e)} />
                            </div>
                            : null
                        }

                        <span className=" bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold">น้ำหนักทอง (กรัม)</span>
                        <Input classNames={{inputWrapper: "backdrop-blur-xl border border-white/10 "}} size="lg" className=" min-w-80 text-base " step="1" type="text" inputMode="decimal" min="0" value={gram ?? ""} onValueChange={(e) => validateGramInput(e)} />
                      </div>

                      <div className="mt-8 flex">
                        <div className=" flex flex-col w-full items-center justify-center backdrop-blur-xl border border-white/20  text-white bg-gradient-to-b from-black/80 to-orange-950/70 rounded-2xl py-5">
                          <span className=" flex text-center">ราคาประเมิน</span>
                          <Skeleton isLoaded={!isLoading} className="rounded-lg">
                            <span className="bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold truncate text-3xl">{
                              calc > 9999999
                                ? formatNumber(calc) + "บาท"
                                : calc.toLocaleString(`th-TH`, {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 2,
                                }) + " บาท"
                            } </span>
                          </Skeleton>

                          <span className=" font-normal text-xs mt-2">ประเมินราคาทองคำแบบเรียลไทม์ด้วยระบบอัตโนมัติ</span>
                          <span className=" font-normal text-xs">อัพเดทราคาทุก 30 วินาที</span>
                        </div>
                      </div>

                      {
                        isLoading == false ? (
                      <button
                        onClick={() => handleQuote()}
                        className=" mt-5 h-14 justify-center backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/5 to-white/10 text-white  rounded-full transition-all duration-200 hover:scale-105 flex flex-row items-center pr-4"
                      >
                        <FilePlus size={20} />
                        <span className=" pl-2">เพิ่มลงในใบเสนอราคา</span>
                      </button>) : null
                      }

                      
                    </div>
                  </div>
              }

              <Button as="a" href="https://line.me/R/ti/p/@446pxqyk?ts=04201136&oat_content=url" className=" hover:scale-105 backdrop-blur-xl border-2 border-white/20 flex h-14 w-56 px-10 mt-5  bg-gradient-to-b from-green-500 to-green-700 " radius="full">
                <img alt="" width={40} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/LINE_New_App_Icon_%282020-12%29.png/500px-LINE_New_App_Icon_%282020-12%29.png" />
                <div>สนใจซื้อขาย คลิกที่นี่</div>
              </Button>
            </div>

            <div className="inline-block text-center justify-center w-full mt-20 mb-7 flex flex-col">
              <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                กราฟทองตอนนี้
              </span>
            </div>

            <div className=" flex w-full items-center justify-center px-5">
              <iframe src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_8d6d1&symbol=FOREXCOM%3AXAUUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
                className=" flex w-full rounded-3xl lg:w-1/2"
                height="500" 
                scrolling="no">
              </iframe>
            </div>

            <div className="relative flex w-full py-16 bg-white/5 mt-10 flex-col items-center px-5">
              <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-t from-transparent to-black" />
              <span className="  text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">บทความ</span>
              <span className=" mb-10 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold ">ข่าวสารประชาสัมพันธ์จาก JK Goldtrader</span>

              <div className={` grid items-start justify-center gap-x-4 gap-y-5 grid-cols-1 max-md:grid-cols-1`}>
                {
                  blogs.map((i, index) => (
                    <div key={index} className=" flex flex-col rounded-2xl border-yellow-600 border-2 bg-[#14100b] sm:w-96  ">
                      <img
                        className="h-64 w-full object-cover rounded-xl"
                        alt="fischer"
                        src={i.img}
                      />

                      <span className=" w-full px-5 text-2xl font-medium text-yellow-600 mt-2">{i.title}</span>
                      <div className=" flex flex-row items-center gap-x-2 my-4 mx-4">
                        <Image
                          className=" rounded-full"
                          alt="author"
                          src={i.author_img}
                          width={40}
                          height={40}
                        />
                        <div className=" flex flex-col">
                          <span>{i.author_name} (ผู้เขียน) </span>
                          <span className=" text-xs">{moment(i.created_at).locale('th').format('D MMMM YYYY')}</span>
                        </div>
                      </div>
                      <span className=" w-full h-full px-5 mb-5 text-sm whitespace-pre-line  line-clamp-6">{i.description}</span>
                      <Button className=" mx-5 mb-5 bg-gradient-to-b from-yellow-500 to-yellow-700  font-bold" onPress={() => handleSetBlog(index)}>อ่านเพิ่มเติม</Button>
                    </div>
                  )
                  )
                }
              </div>
              <span className=" text-gray-500 mt-5 bg-white/20 px-5 py-2 rounded-full">ทั้งหมด {blogs.length} บทความ</span>

              <div className=" w-full mt-20 md:mt-32 md:px-5 flex items-center justify-center flex-col">
                <span className="  text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold mb-10">พิกัดร้าน</span>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.1906687314067!2d100.64438107586528!3d13.767372496931236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d61e658c0eb4f%3A0xa6559716dcd55c86!2z4LiI4LmI4Liy4LiE4Li04LiHIOC4m-C4suC4geC4nuC4meC4seC4hw!5e0!3m2!1sen!2sth!4v1751569935480!5m2!1sen!2sth"
                  width="600"
                  height="450"
                  loading="lazy"
                  className=" rounded-3xl w-full" >
                </iframe>
              </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" scrollBehavior="inside" placement="center">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">{blog.title}</ModalHeader>
                    <ModalBody>
                      <img
                        className="w-full h-64 object-cover rounded-3xl"
                        alt="author"
                        src={blog.img}
                      />
                      <span className="whitespace-pre-line">{blog.description}</span>
                    </ModalBody>
                    <ModalFooter>
                      <Button className="bg-gradient-to-b from-yellow-500 to-yellow-700  font-bold  w-full" onPress={onClose}>
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
}
