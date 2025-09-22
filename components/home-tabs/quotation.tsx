import { QuotationModel } from "@/app/models/Quotations";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { BookmarkX, Delete, FilePlus } from "lucide-react";
import QuotationComponent from "../quotation";
import { useState } from "react";

interface Props {
  quotation?: QuotationModel[];
  callback: (data: QuotationModel[]) => void;
}

export const Quotation = ({ quotation, callback }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pQuot, setPQout] = useState<QuotationModel[]>([]);

  const handleDropIndex = (index: number) => {
    callback(quotation?.filter((_, i) => i != index) ?? []);
  };

  const handleSave = () => {
    setPQout(quotation ?? []);
    //callback([]);
  };

  return (
    <div className=" min-h-screen flex w-full items-center justify-start flex-col">
      {pQuot.length == 0 ? (
        <div>
          <div className="inline-block  text-center justify-center w-full mt-20">
            <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              รายการใบเสนอราคา
            </span>
          </div>

          <div className=" bg-white/5  backdrop-blur-xl border border-white/20 w-96 h-full rounded-3xl p-2 flex flex-col gap-y-2 transition-background duration-300 ease-in-out mt-5 mb-5">
            {(quotation?.length ?? 0 > 0) ? (
              <div>
                <div className=" w-full flex flex-row justify-between items-center pl-2">
                  <span>ทั้งหมด {quotation?.length} รายการ</span>
                  <div className=" flex flex-row gap-x-2">
                    <Button
                      onPress={() => callback([])}
                      className="backdrop-blur-xl border border-white/20 bg-red-700/60 rounded-full flex h-10 text-xs"
                      radius="lg"
                    >
                      <Delete size={20} color="white" className="" /> ลบทั้งหมด
                    </Button>
                    <Button
                      onPress={() => handleSave()}
                      className="backdrop-blur-xl border border-white/20 bg-blue-500/60 rounded-full flex h-10 text-white"
                      radius="lg"
                    >
                      สร้าง
                    </Button>
                  </div>
                </div>
                {quotation?.map((i, n) => (
                  <div key={n} className=" flex w-full flex-row gap-x-2 my-4 ">
                    <div className=" backdrop-blur-xl border border-white/20 bg-white/10 w-full rounded-2xl px-2 py-2 transition-opacity duration-300 ease-in-out">
                      <div className="text-sm  font-bold pl-1 bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent rounded-full mb-2 flex flex-row justify-between items-center">
                        {n + 1} : {i.goldType}
                        <Button
                          onPress={() => handleDropIndex(n)}
                          className="bg-[#14100b] rounded-full flex h-10 justify-center items-center"
                          radius="lg"
                        >
                          <Delete color="red" className="" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 text-sm gap-x-2 gap-y-2">
                        <div className="flex flex-col items-center backdrop-blur-xl border border-white/20 bg-[#14100b] rounded-xl py-2 justify-center ">
                          <span className="bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent font-bold">
                            ราคา
                          </span>
                          <span>{i.goldPrice}</span>
                        </div>
                        <div className="flex flex-col items-center backdrop-blur-xl border border-white/20 bg-[#14100b] rounded-xl py-2 justify-center ">
                          <span className="bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent font-bold">
                            ราคาบวก
                          </span>
                          <span>{i.weightBaht}</span>
                        </div>
                        <div className="flex flex-col items-center backdrop-blur-xl border border-white/20 bg-[#14100b] rounded-xl py-2 justify-center">
                          <span className="bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent font-bold">
                            % ซื้อ
                          </span>
                          <span>{i.percentage}</span>
                        </div>
                        <div className="flex flex-col items-center backdrop-blur-xl border border-white/20 bg-[#14100b] rounded-xl py-2 justify-center">
                          <span className="bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent font-bold">
                            น้ำหนัก
                          </span>
                          <span>{i.laborCost}</span>
                        </div>
                        <div className="flex flex-col items-center backdrop-blur-xl border border-white/20 bg-[#14100b] rounded-xl py-2 justify-center">
                          <span className="bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent font-bold">
                            ต่อกรัม
                          </span>
                          <span>{i.costPerBaht}</span>
                        </div>
                        <div className="flex flex-col items-center backdrop-blur-xl border border-white/20 bg-[#14100b] rounded-xl py-2 justify-center">
                          <span className="bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent font-bold">
                            ทั้งหมด
                          </span>
                          <span>{i.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-96 flex w-full items-center justify-center flex-col gap-y-4">
                <BookmarkX size={80} />
                ยังไม่มีรายการ กรุณาเพิ่มที่หน้าแรกครับ
              </div>
            )}
          </div>
        </div>
      ) : (
        <QuotationComponent items={pQuot} onChange={() => setPQout([])} />
      )}
    </div>
  );
};
