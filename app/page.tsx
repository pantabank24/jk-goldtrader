'use client'

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Input } from "@heroui/input";
import {Button, Select, SelectItem} from "@heroui/react";
import React, { useEffect } from "react";
import moment from "moment";

export const goldTypes = [
  {key: "1", label: "ทองคำแท่ง 96.5%"},
  {key: "2", label: "ทองรูปพรรณ"},
  {key: "3", label: "ทองหลอม"},
  {key: "4", label: "กรอบทอง/ตลับทอง"},
  {key: "5", label: "ทอง 9K"},
  {key: "6", label: "ทอง 14K"},
  {key: "7", label: "ทอง 18K"},
  {key: "8", label: "อื่น ๆ"},
];

export interface PriceDto {
  gold965: Gold965
  timestamp: string
}

export interface Gold965 {
  bid: number
  ask: number
  diff: any
}

export default function Home() {

  const [gold, setGold] = React.useState<PriceDto>();

  const fetchAPI = async () => {
    await fetch('/api/gold')
      .then(res => res.json())
      .then((data:PriceDto) => setGold(data));
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  const [value, setValue] = React.useState("1");
  const [gram, setGram] = React.useState("1");
  const [percent, setPercent] = React.useState("90");
  const [calc, setCalc] = React.useState(0);

  const handleSelectionChange = (e:any) => {
    setValue(e.target.value);
  };

  const calcPrice = (val: string) => {

    if (val) {
      setGram(val.replace(/^0+/, ''))
    } else {
      setGram("0")
      setCalc(0)
    }

    if (val) {
      var gramPrice = (gold?.gold965.ask ?? 0) / 15.244;
      switch (value) {
        case "1": 
          setCalc(gramPrice * parseFloat(val))
          break;
        case "2": 
          setCalc(gramPrice * parseFloat(val))
          break;
        case "3":
          var calcs = (gramPrice * (parseFloat(percent)/96.5)) * parseFloat(val)
          setCalc(calcs)
          break;
        case "4":
          var calcs = (gramPrice * (parseFloat(percent)/96.5)) * parseFloat(val)
          setCalc(calcs)
          break;
        case "5":
          var calcs = (gramPrice * 0.388) * parseFloat(val)
          setCalc(calcs)
          break;
        case "6":
          var calcs = (gramPrice * 0.6045) * parseFloat(val)
          setCalc(calcs)
          break;
        case "7":
          var calcs = (gramPrice * 0.7777) * parseFloat(val)
          setCalc(calcs)
          break;
        case "8":
          var calcs = (gramPrice * (parseFloat(percent)/100)) * parseFloat(val)
          setCalc(calcs)
          break;
        default:
          setCalc(2)
          break;
      }
    }
  }

  
  return (
    <section className="flex flex-col items-center justify-center gap-4 pb-8 md:pb-10">
      <div className="relative w-full max-md:h-72 h-96  overflow-hidden mb-10">
        <img className=" w-full max-md:h-72 max-2xl:h-96 object-cover" src="https://scontent.fbkk22-6.fna.fbcdn.net/v/t39.30808-6/469870415_122104990004668442_9007667758804756180_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeH7MvKEoaJDWxJQVQJmWkS3o2XdnA1NDHCjZd2cDU0McJpRM3PfMVkVvHavKASueNT62OgjiAjv4v0hldQ3ZWP5&_nc_ohc=XhuFZpBL00cQ7kNvwG8tTeE&_nc_oc=Adn4FWTHKyBL44-WsXHdw7EW_Dzmb3NAUBu48DfzD6qsKQAZm0ExMGStpO7PZNxyOv8&_nc_zt=23&_nc_ht=scontent.fbkk22-6.fna&_nc_gid=aCVQwkDP3chrc8Rmd4S92g&oh=00_AfILYqPrYHkNnlPaZ_2vghbsS1WSt7iFMDRT1rIZ7bjYQQ&oe=68203555" />
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
          <span className=" font-normal text-sm">{gold?.gold965.ask ?? 0} บาท</span>
          <span className=" font-normal text-sm text-yellow-500">ราคาขาย</span>
          <span className=" font-normal text-sm">{gold?.gold965.bid ?? 0} บาท</span>
        </div>
        <span className=" font-normal text-sm mb-2 mt-4">อัปเดทล่าสุด : {moment(gold?.timestamp).locale('th').format('D MMMM YYYY HH:mm')}</span>
      </div>


      

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-10 bg-gray-200/10 px-10 py-5 rounded-3xl">
        <div className=" gap-3 flex flex-col items-center">
          <span className=" text-yellow-500 font-normal">ประเภททอง</span>
          <Select 
            onChange={handleSelectionChange}
            className="min-w-80"
            selectedKeys={[value]}
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
            value === "8" || value === "3" || value === "4"
              ? <div className=" flex flex-col items-center">
                <span className=" text-yellow-500 font-normal">เปอร์เซ็นต์ทอง (%)</span>
                <Input className=" min-w-80" type="string" inputMode="numeric" value={percent} onValueChange={(e) => setPercent(e)} />
                </div> 
              : null
          }
        
          <span className=" text-yellow-500 font-normal">น้ำหนักทอง (กรัม)</span>
          <Input className=" min-w-80" inputMode="numeric" value={gram} onValueChange={(e) => calcPrice(e)} />
        </div>

        <div className="mt-8 flex">
          <div className=" flex flex-col items-center justify-center border-1.5 border-yellow-600 bg-[#14100b] rounded-2xl min-w-80 py-5">
            <span className=" flex text-center">ราคาประเมิน</span>
            <span className="text-yellow-500 font-normal text-5xl">{calc.toFixed(2)} บาท</span>
            <span className=" font-normal text-xs mt-2">ประเมินราคาทองคำแบบเรียลไทม์ด้วยระบบอัตโนมัติ</span>
            <span className=" font-normal text-xs">อัพเดทราคาทุก 30 วินาที</span>
          </div>
        </div>
      </div>

      <Button as="a" href="https://line.me/R/ti/p/@446pxqyk?ts=04201136&oat_content=url" className=" flex h-14 px-10  bg-green-600" radius="full">
        <img width={40} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/LINE_New_App_Icon_%282020-12%29.png/500px-LINE_New_App_Icon_%282020-12%29.png"/>
        <div>สนใจซื้อขาย คลิกที่นี่</div>
      </Button>
      
    </section>
  );
}
