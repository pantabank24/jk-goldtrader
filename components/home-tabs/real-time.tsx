import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Button,
  Input,
} from "@heroui/react";
import { BannerSlider } from "../banner-slide"
import {useAsyncList} from "@react-stately/data";
import React, { useEffect } from "react";
import { PriceDto } from "@/app/models/Models";
import { QuotationModel } from "@/app/models/Quotations";

interface Props {
  pricing?: PriceDto
  service: number
}

export const RealTime = ({pricing, service}: Props) => {

    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);
    const [gold, setGold] = React.useState<any>([]);
    const [gram, setGram] = React.useState("1")
    const [plus, setPlus] = React.useState("0")

    useEffect(() => {
        CalculateGold()
      }, [gram, plus])

    const CalculateGold = () => {
      
      var goldList = [];

      for (let i = 100; i >= 1; i--) {
        var calcs = 0;
        if (i > 30) {
          calcs = (((pricing?.gold965.ask ?? 0) + parseFloat(plus == "" ? "0" : plus ?? "0")) * service * (i / 100) * parseFloat(gram === "" ? "1" : gram))
        } else {
          calcs = (((pricing?.gold965.ask ?? 0)) * service * (i / 100) * parseFloat(gram === "" ? "1" : gram))
        }
        goldList.push({
          percent: i,
          gram: parseFloat(gram).toLocaleString(),
          plus: i > 30 ?  parseFloat(plus).toLocaleString() : 0,
          value: Math.floor(calcs).toLocaleString()
        })
      }

      setGold(goldList)
    }

    const validateGramInput = (i: string) => {
    if (parseFloat(i) > 999999) {
      i = '999999'
    }
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) < 0) {
        setGram("1")
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

    return(
      <div className=" min-h-screen flex flex-col items-center ">
          <BannerSlider />

          <div className="inline-block  text-center justify-center w-full my-5 ">
            <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              ตรวจราคาหลอมแบบเรียลไทม์
            </span>
          </div>

          <div className=" flex flex-col lg:flex-row items-center lg:items-start ">
            <div className=" grid lg:flex grid-cols-2 lg:flex-col gap-y-2 gap-x-2 px-2 my-5 justify-start">
              <div className=" flex flex-col h-24 items-center backdrop-blur-xl border border-white/20 bg-white/10 rounded-3xl px-2 pt-2">
                <span>น้ำหนัก (กรัม)</span>
                <Input color="default" size="lg" className=" my-2  text-base" step="1" type="text" inputMode="decimal" min="0" max="100" value={gram} onValueChange={(e) => validateGramInput(e)} />
              </div>
              <div className=" flex flex-col h-24 items-center backdrop-blur-xl border border-white/20 bg-white/10 rounded-3xl px-2 pt-2">
                <span>ราคาบวก</span>
                <Input color="default" size="lg" className=" my-2 text-base" step="1" type="text" inputMode="decimal" min="0" max="100" value={plus} onValueChange={(e) => validatePlusInput(e)} />
              </div>
            </div>


            <div className=" w-full mb-10 px-2">
              <Table
                isStriped 
                isHeaderSticky
                aria-label="Example table with client side sorting"
                classNames={{
                  base: "max-h-[520px] lg:overflow-scroll bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl",
                  table: "min-h-[420px]",
                  thead: "bg-white/15 backdrop-blur-xl border-b border-white/20",
                  tbody: "",
                  th: "bg-white/15 backdrop-blur-xl text-white/90 font-semibold border-b border-white/20",
                  td: "text-white/80 border-b border-white/10",
                  tr: "hover:bg-white/10 data-[odd]:bg-white/5"
                }}
                className=" scrollbar-hide"
              >
                  <TableHeader>
                    <TableColumn className=" text-xs text-center" key="percent">เปอร์เซ็นต์ทอง</TableColumn>
                    <TableColumn className=" text-xs text-center" key="plus">ราคาบวก</TableColumn>
                    <TableColumn className=" text-xs text-center" key="gram">น้ำหนัก (กรัม)</TableColumn>
                    <TableColumn className=" text-xs text-center" key="value">ราคา</TableColumn>
                  </TableHeader>
                  <TableBody
                    items={gold}
                    loadingContent={<Spinner label="Loading..." />}
                  >
                    {(item: any) => (
                      <TableRow key={item.percent}>
                        {(columnKey) => <TableCell className=" text-lg text-center">{getKeyValue(item, columnKey)}</TableCell>}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
            </div>
          </div>
      </div>
    )
}