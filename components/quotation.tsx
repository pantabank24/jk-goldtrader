"use client";

import React, { useState } from "react";
import {
  Printer,
  Plus,
  Trash2,
  Save,
  ChevronDown,
  ChevronLeft,
  Sparkle,
  Sparkles,
  SquarePen,
  ImageDown,
} from "lucide-react";
import { QuotationModel } from "../app/models/Quotations";
import { Input } from "@heroui/input";
import moment from "moment";
import { Switch } from "@heroui/switch";
import AutoResizeTextarea from "./autoresizetextarea";
import {
  Button,
  CalendarDate,
  Checkbox,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { json, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";
import { FormSchema, QuotForm } from "@/form/header-quot";
import { fa } from "zod/v4/locales";
import html2canvas from "html2canvas";

interface Props {
  items: QuotationModel[];
  onChange: (value: boolean) => void;
}

const QuotationComponent = ({ items, onChange }: Props) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const [roundSelected, setRoundSelected] = React.useState("ไม่ปัด");
  const [cusName, setCusName] = useState("");
  const [cusTel, setCusTel] = useState("");
  const [namePref, setNamePref] = useState(" ");
  const [date, setDate] = useState(
    today(getLocalTimeZone()).subtract({ days: 0 })
  );

  const [showSeq, setShowSeq] = React.useState(true);
  const [showList, setShowList] = React.useState(true);
  const [showPlus, setShowPlus] = React.useState(true);
  const [showPercent, setShowPercent] = React.useState(true);
  const [showgram, setShowGram] = React.useState(true);
  const [showQty, setShowQty] = React.useState(true);
  const [showRemark, setShowRemark] = React.useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuotForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      website: "",
      address: "",
      shopName: "",
      taxId: "",
    } as any,
  });

  const [companyInfo, setCI] = useState({
    name: "",
    website: "",
    address: "",
    shopName: "",
    license: "",
    taxId: "",
  });

  const quotationInfo = {
    title: "ใบรับซื้อทองคำเก่า/ใบสำคัญจ่าย",
    customerName: "ลูกค้า คุณวิชัย สุนิคำ",
    date: "6/07/2568",
  };

  const onSubmit = (values: any) => {
    console.log(values);
    setCI(values);
  };

  const calculateTotalWeight = () => {
    return items.reduce((sum, item) => sum + (item.laborCost || 0), 0);
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  const mmToPx = (mm: number, dpi = 300) => Math.round((mm / 25.4) * dpi);

  const handleDownloadImage = async () => {
    const el = document.getElementById("print-section");
    if (!el) return;

    // ตั้งค่ากระดาษที่ต้องการ (ตัวอย่าง A4 แนวตั้ง 300 DPI)
    const dpi = 300;
    const targetW = mmToPx(70, dpi); // 2480
    const targetH = mmToPx(99, dpi); // 3508

    // รอฟอนต์/รูปให้โหลดครบ
    await document.fonts?.ready?.catch(() => {});

    const canvas = await html2canvas(el, {
      // สำคัญ: ไม่ให้ html2canvasสเกลซ้ำ
      scale: 1,

      // กำหนดพื้นที่เรนเดอร์ให้เท่าขนาดที่ต้องการ
      width: targetW,
      height: targetH,
      windowWidth: targetW,
      windowHeight: targetH,

      backgroundColor: "#fff",
      useCORS: true,

      // ปรับขนาด element ในโดมที่ถูก clone ก่อนแคป
      onclone: (doc) => {
        const clone = doc.getElementById("print-section") as HTMLElement | null;
        if (clone) {
          // บังคับขนาดเป๊ะตรงตามเป้าหมาย
          clone.style.width = `${targetW}px`;
          clone.style.height = `${targetH}px`;

          // กันเนื้อหา overflow ถ้าจำเป็น
          clone.style.boxSizing = "border-box";
        }
      },
    });

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "A4-300dpi.png";
    a.click();
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `goldtrader-quotation-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent
  ) => {
    console.log("aaaaaaaa");
    if (e.key === "ArrowDown") {
      window.scrollBy({ top: 50, left: 0, behavior: "smooth" });
      e.preventDefault(); // กันไม่ให้ cursor ขยับใน textarea
    }
    if (e.key === "ArrowUp") {
      window.scrollBy({ top: -50, left: 0, behavior: "smooth" });
      e.preventDefault();
    }
  };

  const handleRounding = (val: number) => {
    switch (roundSelected) {
      case "ปัดลง":
        return Math.floor(val).toLocaleString();
        break;
      case "ปัดขึ้น":
        return Math.ceil(val).toLocaleString();
        break;
      case "ปัดปกติ":
        return Math.round(val).toLocaleString();
        break;
      case "ไม่ปัด":
        return val.toLocaleString();
      default:
        val.toLocaleString();
        break;
    }
  };

  const grouped: QuotationModel[] = Object.values(
    items.reduce<Record<string, QuotationModel>>((acc, cur) => {
      if (!acc[cur.goldType]) {
        acc[cur.goldType] = { ...cur };
      } else {
        acc[cur.goldType].laborCost += cur.laborCost;
        acc[cur.goldType].goldPrice += cur.goldPrice;

        // ถ้าต้องการรวมเพิ่ม
        acc[cur.goldType].weightBaht += cur.weightBaht;
        acc[cur.goldType].totalAmount += cur.totalAmount;
      }

      return acc;
    }, {})
  );

  return (
    <div className=" w-full lg:w-1/2 mx-auto mt-14  ">
      <div className=" fixed z-50 top-[64px] w-screen lg:w-1/2 flex print:hidden flex-row items-center justify-between mb-20 px-4 pt-2">
        <div className="absolute  bottom-0 left-0 w-full  h-full bg-gradient-to-b from-black/70 to-transparent flex items-end" />
        <button
          onClick={() => onChange(false)}
          className="  backdrop-blur-xl border border-white/20 bg-gray-500/50 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 flex flex-row items-center pr-4"
        >
          <ChevronLeft size={20} />
          <span>ย้อนกลับ</span>
        </button>

        <div className=" flex flex-row gap-x-2">
          <button
            onClick={handlePrint}
            className=" backdrop-blur-xl border w-28 justify-evenly border-white/20 bg-gradient-to-b from-blue-500/60 to-blue-500/50 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 flex flex-row items-center pr-4"
          >
            <Printer size={20} />
            พิมพ์
          </button>
          <button
            onClick={handleDownloadImage}
            className=" backdrop-blur-xl border w-12 h-12 justify-center border-white/20 bg-gradient-to-b from-purple-500/60 to-purple-500/50 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 flex flex-row items-center "
          >
            <ImageDown size={20} />
          </button>
          <Dropdown closeOnSelect={false}>
            <DropdownTrigger>
              <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-blue-600/50 to-green-500/50 text-white h-12 w-12 rounded-full items-center justify-center flex">
                <Sparkles />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" shouldFocusWrap={false}>
              <DropdownItem key="new">
                <Select
                  className="max-w-xs"
                  label="เลือกประเภท"
                  defaultSelectedKeys={[namePref]}
                  onSelectionChange={(k) => setNamePref(k.currentKey ?? "ราคา")}
                >
                  <SelectItem key=" ">ราคา</SelectItem>
                  <SelectItem key="ทองคำ">ราคาทองคำ</SelectItem>
                  <SelectItem key="เงินแท่ง">ราคาเงินแท่ง</SelectItem>
                </Select>
              </DropdownItem>
              <DropdownItem key="new">
                <Select
                  className="max-w-xs"
                  label="ปัดเศษ"
                  defaultSelectedKeys={[roundSelected]}
                  onSelectionChange={(k) =>
                    setRoundSelected(k.currentKey ?? "ปัดลง")
                  }
                  startContent={
                    <Tooltip
                      placement="bottom-end"
                      content={
                        <div className=" flex flex-col text-sm">
                          <div>
                            การปัดเศษ จะปัดเฉพาะราคาบวก, % ซื้อ, ต่อกรัม
                            และน้ำหนัก
                          </div>
                          <div className=" text-xs text-white/50">
                            (น้ำหนักจะมีเงื่อนไข หากน้ำหนักน้อยกว่า 90
                            จะปัดเศษตามที่เลือก
                          </div>
                          <div className=" text-xs text-white/50">
                            หากมากกว่า 90 จะไม่ปัดเศษ)
                          </div>
                        </div>
                      }
                    >
                      ?
                    </Tooltip>
                  }
                >
                  <SelectItem key="ปัดลง">ปัดลง</SelectItem>
                  <SelectItem key="ปัดขึ้น">ปัดขึ้น</SelectItem>
                  <SelectItem key="ปัดปกติ">ปัดปกติ</SelectItem>
                  <SelectItem key="ไม่ปัด">ไม่ปัด</SelectItem>
                </Select>
              </DropdownItem>
              <DropdownItem key="date">
                <DatePicker
                  className="max-w-[284px]"
                  label="วันออกใบเสร็จ"
                  value={date}
                  onChange={(v) => v && setDate(v)}
                />
              </DropdownItem>
              <DropdownItem key="switch">
                <div className=" flex flex-col gap-y-2">
                  <Checkbox
                    isSelected={showSeq}
                    onValueChange={(i) => setShowSeq(i)}
                  >
                    ลำดับ
                  </Checkbox>
                  <Checkbox
                    isSelected={showList}
                    onValueChange={(i) => setShowList(i)}
                  >
                    รายการ
                  </Checkbox>
                  <Checkbox
                    isSelected={showPlus}
                    onValueChange={(i) => setShowPlus(i)}
                  >
                    ราคาบวก
                  </Checkbox>
                  <Checkbox
                    isSelected={showPercent}
                    onValueChange={(i) => setShowPercent(i)}
                  >
                    % ซื้อ
                  </Checkbox>
                  <Checkbox
                    isSelected={showgram}
                    onValueChange={(i) => setShowGram(i)}
                  >
                    น้ำหนัก
                  </Checkbox>
                  <Checkbox
                    isSelected={showQty}
                    onValueChange={(i) => setShowQty(i)}
                  >
                    ต่อกรัม
                  </Checkbox>
                  <Checkbox
                    isSelected={showRemark}
                    onValueChange={(i) => setShowRemark(i)}
                  >
                    หมายเหตุ
                  </Checkbox>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* <span className="text-3xl font-bold bg-gradient-to-b items-center justify-center flex from-white to-gray-500 bg-clip-text text-transparent">
          พรีวิวใบเสนอราคา
        </span>   */}
      </div>

      <div className=" flex flex-col mb-5 gap-2 max-md:flex-col p-4 mt-16">
        <div className="flex flex-row gap-2  backdrop-blur-xl border border-white/20 bg-white/20 hover:bg-white/30 rounded-full px-2 py-2 justify-between">
          <Switch
            color="success"
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            หัวใบเสร็จ
          </Switch>
          <button
            onClick={() => onOpen()}
            className={`  backdrop-blur-xl border border-white/20 bg-gray-500/50 text-white  rounded-full transition-all duration-200 hover:scale-110 flex flex-row items-center pr-4 justify-evenly pl-5`}
          >
            <SquarePen size={14} />
            <span className=" text-xs ml-2">ปรับแต่ง</span>
          </button>
        </div>
        <div className="flex-1">
          <div className={`flex items-center w-full gap-2`}>
            <Input
              isClearable
              onKeyDown={handleKeyDown}
              placeholder="ชื่อลูกค้า"
              classNames={{
                inputWrapper:
                  "backdrop-blur-xl border border-white/20 bg-white/20",
              }}
              size="lg"
              className=" w-full text-base "
              type="text"
              inputMode="text"
              value={cusName}
              onValueChange={(i) => setCusName(i)}
            />
            <Input
              isClearable
              onKeyDown={handleKeyDown}
              placeholder="เบอร์โทร"
              classNames={{
                inputWrapper:
                  "backdrop-blur-xl border border-white/20 bg-white/20",
              }}
              size="lg"
              className=" w-full text-base"
              step="1"
              type="text"
              inputMode="decimal"
              min="0"
              max="100"
              value={cusTel}
              onValueChange={(i) => setCusTel(i)}
            />
          </div>
        </div>
      </div>

      {/* Document */}
      <div
        id="print-section"
        className="bg-white border border-gray-400 print:border-none text-black"
      >
        {/* Header */}
        {isSelected ? (
          <div>
            <div className="text-center py-6  border-gray-400">
              <h1 className="text-2xl font-bold mb-2">{companyInfo.name}</h1>
              <p className="text-lg font-semibold mb-2">
                {companyInfo.website}
              </p>
              <p className="text-sm mb-2">{companyInfo.address}</p>
            </div>

            <div className=" flex  flex-col ml-5 border-b">
              <p className="text-sm mb-2">{companyInfo.shopName}</p>
              <p className="text-sm mb-2">
                {companyInfo.taxId && "เลขประจำตัวผู้เสียภาษี"}
              </p>
              <p className="text-sm font-semibold">{companyInfo.taxId}</p>
              <p></p>
            </div>
          </div>
        ) : null}

        {/* Title and Info */}
        <div className="p-1">
          <h2 className="text-xl font-bold text-center mb-4">
            {quotationInfo.title} {namePref}
          </h2>
          <div className="flex justify-between items-center mb-1">
            <div>
              <p className="font-semibold">ชื่อลูกค้า: {cusName}</p>
              <p className="">เบอร์โทร: {cusTel}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                วันที่:{" "}
                {moment(date.toString()).locale("th").format("D MMMM YYYY")}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                {showSeq && (
                  <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">
                    ลำดับ
                  </th>
                )}
                {showList && (
                  <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">
                    รายการ
                  </th>
                )}
                <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">
                  ราคา{namePref}
                </th>
                {showPlus && (
                  <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">
                    ราคาบวก
                  </th>
                )}
                {showPercent && (
                  <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">
                    % ซื้อ
                  </th>
                )}
                {showgram && (
                  <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">
                    น้ำหนัก
                  </th>
                )}
                {showQty && (
                  <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">
                    ต่อกรัม
                  </th>
                )}
                <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold">
                  จำนวนเงิน
                </th>
                {showRemark && (
                  <th className="border border-gray-400 px-2 py-2 text-center text-sm font-semibold w-10">
                    หมายเหตุ
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index + 1} className="hover:bg-gray-50">
                  {showSeq && (
                    <td className="border border-gray-400 px-2 text-center text-sm">
                      {index + 1}
                    </td>
                  )}
                  {showList && (
                    <td className="border border-gray-400 px-2 text-center text-sm">
                      {item.goldType}
                    </td>
                  )}
                  <td className="border border-gray-400 px-2 text-center text-sm">
                    {handleRounding(item.goldPrice)}
                  </td>
                  {showPlus && (
                    <td className="border border-gray-400 px-2  text-center text-sm">
                      {item.weightBaht.toLocaleString()}
                    </td>
                  )}
                  {showPercent && (
                    <td className="border border-gray-400 px-2  text-center text-sm">
                      {item.percentage < 90
                        ? handleRounding(item.percentage)
                        : item.percentage}
                    </td>
                  )}
                  {showgram && (
                    <td className="border border-gray-400 px-2  text-center text-sm">
                      {item.laborCost.toLocaleString()}
                    </td>
                  )}
                  {showQty && (
                    <td className="border border-gray-400 px-2  text-center text-sm">
                      {handleRounding(item.costPerBaht)}
                    </td>
                  )}
                  <td className="border border-gray-400 px-2 text-center text-sm">
                    {item.totalAmount.toLocaleString()}
                  </td>
                  {showRemark && (
                    <td className="border border-gray-400 px-2 text-center text-sm">
                      <AutoResizeTextarea />
                    </td>
                  )}
                </tr>
              ))}

              {/* Empty rows for spacing */}
              {showSeq &&
                Array.from({ length: Math.max(0, 10 - items.length) }).map(
                  (_, index) => (
                    <tr key={`empty-${index}`}>
                      {showSeq && (
                        <td className="border border-gray-400 px-2 text-center text-sm">
                          {items.length + index + 1}
                        </td>
                      )}
                      {showList && (
                        <td className="border border-gray-400 px-2 text-center text-sm"></td>
                      )}
                      <td className="border border-gray-400 px-2 text-center text-sm"></td>
                      {showPlus && (
                        <td className="border border-gray-400 px-2 text-center text-sm"></td>
                      )}
                      {showPercent && (
                        <td className="border border-gray-400 px-2 text-center text-sm"></td>
                      )}
                      {showgram && (
                        <td className="border border-gray-400 px-2 text-center text-sm"></td>
                      )}
                      {showQty && (
                        <td className="border border-gray-400 px-2 text-center text-sm"></td>
                      )}
                      <td className="border border-gray-400 px-2 text-center text-sm"></td>
                      {showRemark && (
                        <td className="border border-gray-400 px-2 text-center text-sm"></td>
                      )}
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="pt-4">
          <div className=" grid grid-cols-2">
            <div className="flex justify-start">
              <table className=" w-full">
                <thead>
                  <tr>
                    <th className="border border-gray-400">รายการ</th>
                    <th className="border border-gray-400">น้ำหนัก</th>
                    <th className="border border-gray-400">ราคา</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped?.map((item) => (
                    <tr key={item.goldType}>
                      <td className="border border-gray-400 text-center">
                        {item.goldType}
                      </td>
                      <td className="border border-gray-400 text-center">
                        {item.laborCost.toFixed(1)}
                      </td>
                      <td className="border border-gray-400 text-center">
                        {item.goldPrice.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <div className="w-80">
                <div className="border border-gray-400">
                  <div className="flex justify-between p-1 border-b border-gray-400">
                    <span className="font-semibold">น้ำหนักรวม</span>
                    <span className="font-semibold">
                      {calculateTotalWeight().toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between p-1 border-b border-gray-400">
                    <span className="font-semibold">รวมเป็นเงิน</span>
                    <span className="font-semibold">
                      {calculateGrandTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between p-1">
                    <span className="font-semibold">อื่น ๆ</span>
                    <span className="font-semibold"></span>
                  </div>
                  <div className="flex justify-between p-1 border-t border-gray-400">
                    <span className="font-bold">จำนวนรวมทั้งสิ้น</span>
                    <span className="font-bold">
                      {calculateGrandTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-col text-sm gap-y-2 mt-12">
            <div className=" flex flex-row gap-x-4">
              <div className=" w-12 flex flex-row justify-end">ชำระโดย</div>
              <div className=" flex flex-col gap-y-2">
                <Checkbox>
                  <div className=" text-black text-sm">
                    เงินสด
                    ......................................................................
                  </div>
                </Checkbox>
                <Checkbox>
                  <div className=" text-black text-sm">
                    เช็ค / บัตร / เงินโอน ธนาคาร
                    ......................................................................
                  </div>
                </Checkbox>
              </div>
            </div>
            <div className=" flex flex-row max-md:overflow-hidden gap-x-4">
              <div className=" flex flex-row gap-x-4">
                <div className=" w-12 flex flex-row justify-end">เลขที่</div>
                <div className=" ">
                  ...................................................................
                </div>
              </div>
              <div className=" flex flex-row">
                ลงวันที่
                .........................................................
              </div>
              <div className=" flex flex-row">
                จำนวนเงิน
                .......................................................
              </div>
            </div>
            <div className=" flex flex-row indent-16">
              ข้าพเจ้าขอรับรองว่าเป็นสมบัติของข้าพเจ้าโดยแท้จริง
              และขอรับรองว่าของที่นำมาขายนั้นเป็นของที่บริสุทธิ์
              ถ้าหากเป็นของทุจริตแล้ว ข้าพเจ้าขอรับผิดชอบทั้งสิ้น
              และได้อ่านทบทวนเรียบร้อยแล้วจึงลงนามไว้เป็นหลักฐาน
            </div>
            <div className=" flex flex-row justify-end mt-8">
              <div className=" flex flex-col w-80 gap-y-12">
                <div className=" flex flex-row justify-start">
                  ลงชื่อ
                  ...........................................................................
                  ผู้ขาย/ผู้รับเงิน
                </div>
                <div className=" flex flex-row justify-start">
                  ลงชื่อ
                  ...........................................................................
                  ผู้ซื้อ/ผู้รับสินค้า
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                แก้หัวใบเสร็จ
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=" flex flex-col gap-y-3"
                >
                  <Input
                    size="lg"
                    label="ชื่อร้าน/บริษัท"
                    onValueChange={(i) => {
                      var c = companyInfo;
                      c.name = i;
                      setCI(companyInfo);
                    }}
                    {...register("name")}
                  />
                  <Input
                    size="lg"
                    label="รายละเอียดร้าน/บริษัท"
                    onValueChange={(i) => {
                      var c = companyInfo;
                      c.name = i;
                      setCI(companyInfo);
                    }}
                    {...register("website")}
                  />
                  <Input
                    size="lg"
                    label="ที่อยู่ร้าน/บริษัท"
                    onValueChange={(i) => {
                      var c = companyInfo;
                      c.name = i;
                      setCI(companyInfo);
                    }}
                    {...register("address")}
                  />
                  <Input
                    size="lg"
                    label="ชื่อผู้เสียภาษี"
                    onValueChange={(i) => {
                      var c = companyInfo;
                      c.name = i;
                      setCI(companyInfo);
                    }}
                    {...register("shopName")}
                  />
                  <Input
                    size="lg"
                    label="หมายเลขผู้เสียภาษี"
                    onValueChange={(i) => {
                      var c = companyInfo;
                      c.name = i;
                      setCI(companyInfo);
                    }}
                    {...register("taxId")}
                  />
                  <Button type="submit" color="warning" onPress={onClose}>
                    บันทึก
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            font-size: 12px;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:bg-transparent {
            background: transparent !important;
          }
          input {
            border: none !important;
            background: transparent !important;
            outline: none !important;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      `}</style>
    </div>
  );
};

export default QuotationComponent;
