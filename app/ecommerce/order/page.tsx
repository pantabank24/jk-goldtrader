"use client";

import { DeleteModal } from "@/components/delete-modal";
import { EditModal } from "@/components/edit-modal";
import { Input } from "@heroui/input";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import {
  BookCheck,
  BookX,
  Check,
  ChevronLeft,
  ClockFading,
  Coins,
  Ellipsis,
  FilePlus,
  GalleryVerticalEnd,
  ListMinus,
  MessageCircleReply,
  MessageSquare,
  MessageSquareShare,
  PackagePlus,
  Reply,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PricingPage() {
  const router = useRouter();
  const [menuSelected, setMenuSelected] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onOpenChange: editOnOpenChange,
  } = useDisclosure();
  const menu = [
    {
      key: 0,
      label: "ทั้งหมด",
      icon: <GalleryVerticalEnd />,
    },
    {
      key: 1,
      label: "รอตรวจสอบ",
      icon: <ClockFading />,
    },
    {
      key: 2,
      label: "สำเร็จ",
      icon: <BookCheck />,
    },
    {
      key: 3,
      label: "ยกเลิก",
      icon: <BookX />,
    },
  ];

  const saleList = [
    {
      id: "0",
      title: "ทองหลอม",
      percent: 96.5,
      plus: 1000,
      gram: 1,
      price: 3200,
      detail: "ขายทองครับ",
      status: 0,
      reason: "",
    },
    {
      id: "1",
      title: "ทองคำแท่ง",
      percent: 90,
      plus: 1000,
      gram: 1,
      price: 3200,
      detail: "ขายทองค่ะ",
      status: 1,
      reason: "",
    },
    {
      id: "2",
      title: "ทองหยอด",
      percent: 99.99,
      plus: 1000,
      gram: 1,
      price: 3200,
      detail: "ขายทอง ๆ ๆ",
      status: 2,
      reason: "มันเป็นของหวาน ไม่ใช่ทองคำ เอามาขายได้ไง",
    },
  ];

  const [option, setOption] = useState("3");
  const [selectList, setSelectList] = useState<any[]>([]);

  useEffect(() => {
    if (menuSelected === 0) {
      setSelectList([...saleList]);
    } else {
      setSelectList(saleList.filter((i) => i.status === menuSelected - 1));
    }
  }, [menuSelected]);

  return (
    <div className=" flex flex-col w-full h-full lg:w-1/2  gap-y-4 px-5">
      <div className=" flex-1 h-full">
        <div className=" text-2xl lg:text-4xl font-bold bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent mb-5 flex flex-row items-center gap-x-2">
          <ChevronLeft
            className=" text-white lg:hidden flex items-center justify-center"
            onClick={() => router.push("/ecommerce")}
            size={30}
          />
          รายการขาย
        </div>

        <div className="  w-full h-20 border-white/20 bg-gradient-to-b from-white/20 to-white/20 border-1 rounded-3xl flex flex-row  items-center justify-evenly">
          {menu.map((v, i) => (
            <div
              key={i}
              className={`
              flex bg-gradient-to-b bg-clip-text text-transparent cursor-pointer ${menuSelected === v.key ? "text-yellow-500" : "text-white/50 "}
            `}
            >
              <div
                onClick={() => setMenuSelected(v.key)}
                className={`flex flex-col items-center justify-center gap-y-1 ${menuSelected === v.key ? " border rounded-2xl border-white/20 bg-gradient-to-b from-white/10 to-white/10" : ""} h-16 px-4 lg:px-6`}
              >
                <div>{v.icon}</div>
                <span className=" text-xs">{v.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className=" absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent flex items-start"></div>

        <div className=" flex h-full w-full">
          <div className="flex w-full flex-col gap-y-4 mt-5 h-full overflow-scroll scrollbar-hide pb-44 rounded-2xl">
            {selectList.map((v, i) => (
              <div
                key={i}
                className=" flex flex-col border-white/20 bg-gradient-to-b from-white/10 to-white/10 border-1 px-4 py-2 rounded-2xl"
              >
                <div className=" flex flex-row justify-between">
                  <div className=" flex flex-col">
                    <span className=" text-xl mb-2 font-bold">
                      {v.title} ({v.percent}%)
                    </span>
                    <span className=" text-sm text-white/50">
                      น้ำหนัก {v.gram} กรัม
                    </span>
                    <span className=" text-sm text-white/50">
                      ราคาบวก {v.plus} บาท
                    </span>
                  </div>
                  <div className={` flex flex-col items-end justify-between`}>
                    <div className=" flex flex-row gap-x-2">
                      <div
                        className={`${v.status == 0 ? "text-yellow-300" : v.status == 1 ? " text-green-400" : " text-red-500"} bg-white/10 rounded-full px-3 text-xs flex items-center`}
                      >
                        {v.status == 0 ? (
                          <div className=" flex flex-row items-center gap-x-1 justify-center">
                            <ClockFading size={12} />
                            กำลังตรวจสอบ
                          </div>
                        ) : v.status == 1 ? (
                          <div className=" flex flex-row items-center gap-x-1 justify-center">
                            <Check size={12} />
                            สำเร็จ
                          </div>
                        ) : (
                          <div className=" flex flex-row items-center gap-x-1 justify-center">
                            <X size={12} />
                            ยกเลิก
                          </div>
                        )}
                      </div>
                      {v.status === 0 ? (
                        <Dropdown>
                          <DropdownTrigger>
                            <div className="cursor-pointer">
                              <Ellipsis />
                            </div>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                              key="new"
                              onClick={() => editOnOpen()}
                            >
                              แก้ไข
                            </DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              onClick={() => onOpen()}
                            >
                              ลบ
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      ) : null}
                    </div>
                    <div className=" text-xl font-bold text-yellow-500">
                      {v.price.toLocaleString()} ฿
                    </div>
                  </div>
                </div>
                {v.reason ? (
                  <div className=" flex w-full border-white/20 bg-gradient-to-b from-white/20 to-white/20 border-1 px-2 py-2 rounded-xl mt-2 text-yellow-400 text-sm items-center gap-x-2">
                    <MessageSquareShare size={20} /> {v.reason}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <DeleteModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <EditModal
        onOpen={editOnOpen}
        isOpen={editIsOpen}
        onOpenChange={editOnOpenChange}
      />
    </div>
  );
}
