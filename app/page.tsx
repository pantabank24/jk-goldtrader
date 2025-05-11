'use client'

import { title } from "@/components/primitives";
import { Input } from "@heroui/input";
import {Button, Select, SelectItem, Skeleton} from "@heroui/react";
import React, { useEffect } from "react";
import moment from "moment";
import useSWR from 'swr'
import { PriceDto } from "./models/Models";
import Image from "next/image";
import {Image as HImage} from "@heroui/image";

export default function Home() {

  const [option, setOption] = React.useState("1");
  const [gram, setGram] = React.useState<string | null>("1");
  const [percent, setPercent] = React.useState("90");
  const [calc, setCalc] = React.useState(0);
  let service = 0.0656;

  const fetcher = (url: string) => fetch('/api/gold').then(res => res.json());

  const { data, error, isLoading, isValidating } = useSWR<PriceDto>('/api/gold',  fetcher,
    {
      refreshInterval: 30000
    }
  )

  const goldTypes = [
    {key: "1", label: "ทองคำแท่ง 96.5%"},
    {key: "2", label: "ทองรูปพรรณ"},
    {key: "3", label: "ทองหลอม"},
    {key: "4", label: "กรอบทอง/ตลับทอง"},
    {key: "5", label: "ทอง 9K"},
    {key: "6", label: "ทอง 14K"},
    {key: "7", label: "ทอง 18K"},
    {key: "8", label: "อื่น ๆ"},
  ];

  useEffect(() => {
    calcPrice()
  }, [data, gram, percent, option])

  const handleSelectionChange = (e:any) => {
    setOption(e.target.value);
  };

  const calcPrice = () => {

    if(gram == ""){
      setGram(null)
    }

    var goldPrice = data?.gold965.ask ?? 0
    var gramPrice = (data?.gold965.ask ?? 0) / 15.2;
      switch (option) {
        case "1": 
          setCalc(gramPrice * parseFloat(gram ?? "0"))
          break;
        case "2": 
          setCalc(goldPrice * service * 0.97 * parseFloat(gram ?? "0"))
          break;
        case "3":
          var calcs = 0
          if (parseFloat(percent) > 71 && gram != null) {
            calcs = (goldPrice + 1200) * service * (parseFloat(percent)/100) * parseFloat(gram ?? "0")
          } else if (parseFloat(percent) > 30 && gram != null) {
            calcs = (goldPrice + 1100) * service * (parseFloat(percent)/100) * parseFloat(gram ?? "0")
          } else if (parseFloat(percent) < 30 && gram != null) {
            calcs = goldPrice * service * (parseFloat(percent)/100) * parseFloat(gram ?? "0")
          }
          setCalc(calcs)
          break;
        case "4":
          var calcs = goldPrice * service * (parseFloat(percent)/100) *  parseFloat(gram ?? "0")
          setCalc(calcs)
          break;
        case "5":
          var calcs = (goldPrice + 1000) * service * 0.375 * parseFloat(gram ?? "0")
          setCalc(calcs)
          break;
        case "6":
          var calcs = (goldPrice + 1000) * service * 0.585 * parseFloat(gram ?? "0")
          setCalc(calcs)
          break;
        case "7":
          var calcs = (goldPrice + 1000) * service * 0.75 * parseFloat(gram ?? "0")
          setCalc(calcs)
          break;
        case "8":
          var calcs = goldPrice * service * (parseFloat(percent)/100) * parseFloat(gram ?? "0")
          setCalc(calcs)
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
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) < 0) {
        setGram("")
      } else {
        setGram(i)
      }
    }
  }

  const handleOptionChange = (val: React.ChangeEvent<HTMLSelectElement>) => {
    if (val.target.value !== option && val.target.value) {
      setOption(val.target.value)
    }
  }

  const blogs = [
    {
      title: "ราคาประเมิณทองคำของเว็ปไซต์",
      author_img: "/images/jk.jpg",
      author_name: "จ่าคิง ปากพนัง",
      description: "ราคาทองคำที่ทางเราประเมิณให้ไป เป็นราคาตามเปอร์เซ็นจริงของทองคำที่ท่านใส่ข้อมูลมา ทองคำบางประเภท เช่น ทองคำผสมที่ผ่านการหลอมรวมมา จะมีการบวกให้ตั้งแต่ 500 - 1500 บาท ต่อบาท ทองทำที่ยังไม่ผ่านการหลอมเหลวรวมกับเป็นก้อน บางชิ้น อาจจะมีการหักค่าน้ำประสานทอง บางชิ้นอาจจะไม่มีการหักค่าน้ำประสานทอง ทุกอย่างขึ้นอยู่กับรูปแบบของชิ้นงาน การที่จะได้ราคาที่ถูกต้อง และแม่นยำ จำเป็นต้องนำมาให้างเราตรวจสอบโดยใช้วิธีการ X-Ray ผ่านเครื่องมือการตรวจสอบค่าโลหะ อย่างละเอียด ถึงจะแม่นยำ และได้ราคาสูงสุด ทั้งนี้ หากท่านไหนไม่สะดวกจะนำชิ้นงานของท่านเข้ามาที่ร้าน ท่านสามารถส่งรูปภาพ น้ำหนัก เบื้องต้นมาทาง Line official ของทางร้านได้เลย ทางร้านจะมีแอดมินคอยตอบคำถามเชิงลึกให้ท่านอยู่ 24 ชั่วโมงครับ ขอบคุณที่ท่านเลือกให้เราดูแลท่าน",
      img: "/images/fischer.png",
      created_at: "2025-05-11"
    }
  ]

  
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <div className="relative w-full overflow-hidden mb-10 items-center justify-center flex bg-[#791014]">
        <Image width={1300} height={500} src="/images/jk-banner.jpg" alt="banner"/>
        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>
          ประเมินราคาทองคำ
        </span>
      </div>

      <div className=" flex w-96 text-center flex-col justify-center border-2 border-yellow-500 rounded-2xl py-5 bg-[#14100b] my-5">
        <span className=" font-normal text-xl mb-2">ทองคำเเท่ง 96.5%</span>
        <div className=" grid grid-cols-2">
          <span className=" font-normal text-sm text-yellow-500">ราคารับซื้อ</span>

          <span className=" font-normal text-sm justify-end items-end flex mr-10">
              <Skeleton  isLoaded={!isValidating} className="h-3 w-3/5 rounded-lg ">
                {(data?.gold965.ask ?? 0).toLocaleString(`th-TH`, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} บาท
              </Skeleton>
          </span>
          
          <span className=" font-normal text-sm text-yellow-500">ราคาขาย</span>

          
            <span className=" font-normal text-sm justify-end items-end flex mr-10">
              <Skeleton  isLoaded={!isValidating} className="h-3 w-3/5 rounded-lg ">
                {(data?.gold965.bid ?? 0).toLocaleString(`th-TH`, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} บาท
              </Skeleton>
            </span>
          
          
        </div>
        <span className=" font-normal text-sm mb-2 mt-4 flex flex-row  justify-center">
          อัปเดทล่าสุด : 
          <Skeleton  isLoaded={!isValidating} className="h-3  rounded-lg ml-2">
            {moment(data?.timestamp).locale('th').format('D MMMM YYYY HH:mm')}
          </Skeleton>
        </span>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-10 bg-gray-200/10 px-10 py-5 rounded-3xl">
        <div className=" gap-3 flex flex-col items-center">
          <span className=" text-yellow-500 font-normal">ประเภททอง</span>
          <Select 
            aria-label="เลือกประเภททอง"
            onChange={(e) => handleOptionChange(e)}
            className="min-w-80"
            selectedKeys={option}
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
                <span className=" text-yellow-500 font-normal">เปอร์เซ็นต์ทอง (%)</span>
                <Input className=" min-w-80 text-base" step="1" type="text" inputMode="decimal" min="0" max="100" value={percent} onValueChange={(e) => validatePercentInput(e)} />
                </div> 
              : null
          }
        
          <span className=" text-yellow-500 font-normal">น้ำหนักทอง (กรัม)</span>
          <Input className=" min-w-80 text-base" step="1" type="text" inputMode="decimal" min="0" value={gram ?? ""} onValueChange={(e) => validateGramInput(e)} />
        </div>

        <div className="mt-8 flex">
          <div className=" flex flex-col items-center justify-center border-1.5 border-yellow-600 bg-[#14100b] rounded-2xl min-w-80 py-5">
            <span className=" flex text-center">ราคาประเมิน</span>
            <Skeleton isLoaded={!isValidating} className="rounded-lg">
              <span className="text-yellow-500 font-normal text-2xl">{calc.toLocaleString(`th-TH`, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} บาท</span>
            </Skeleton>
            
            <span className=" font-normal text-xs mt-2">ประเมินราคาทองคำแบบเรียลไทม์ด้วยระบบอัตโนมัติ</span>
            <span className=" font-normal text-xs">อัพเดทราคาทุก 30 วินาที</span>
          </div>
        </div>
      </div>

      <Button as="a" href="https://line.me/R/ti/p/@446pxqyk?ts=04201136&oat_content=url" className=" flex h-14 px-10 mt-2  bg-green-600" radius="full">
        <img alt="" width={40} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/LINE_New_App_Icon_%282020-12%29.png/500px-LINE_New_App_Icon_%282020-12%29.png"/>
        <div>สนใจซื้อขาย คลิกที่นี่</div>
      </Button>

      <div className="relative flex w-full py-16 bg-white/5 mt-10 flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-t from-transparent to-black" />
        <span className="  text-3xl font-bold">บทความ</span>
        <span className=" mb-10 text-lg ">ข่าวสารประชาสัมพันธ์จาก JK-Goldtrader</span>

        <div className={` grid items-center justify-center gap-x-4 grid-cols-1` }>
         {
          blogs.map((i, index) => (
            <div key={index} className=" flex flex-col rounded-2xl border-yellow-600 border-2 bg-[#14100b] w-96">
              <HImage
                alt="fischer"
                src="/images/fischer.png"
              />
              
              <span className=" w-96 px-5 text-2xl font-medium text-yellow-600">{i.title}</span>
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
              <span className=" w-96 px-5 pb-5 text-sm">{i.description}</span>
            </div>
            )
          )
         }
        </div>
        <span className=" text-gray-500 mt-5">- ทั้งหมด {blogs.length} บทความ -</span>
        
      </div>

      
      
    </section>
  );
}
