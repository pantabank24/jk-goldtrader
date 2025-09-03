import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  SelectItem,
  Select,
} from "@heroui/react";
import { PackagePlus, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

export const EditModal: React.FC<Props> = ({
  isOpen,
  onOpen,
  onOpenChange,
}) => {
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

  const [option, setOption] = useState("3");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-2 text-yellow-500 ">
                <SquarePen /> แก้ไขรายการ
              </ModalHeader>
              <ModalBody>
                <div className=" flex flex-row gap-x-4 overflow-x-scroll scrollbar-hide bg-gradient-to-b from-white/10 to-white/10 border-1 rounded-3xl p-2 border-white/20">
                  <img
                    className=" flex w-28 h-28 lg:w-52 lg:h-52 object-cover rounded-2xl"
                    src="/images/banner2.jpg"
                  />
                  <div className="w-28 h-28 lg:w-52 lg:h-52 bg-white/10 text-white/50 rounded-2xl flex flex-shrink-0 flex-col items-center justify-center gap-y-2 font-bold">
                    <PackagePlus size={40} />
                    <div>เพิ่มรูปทอง</div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className={`flex items-center w-full gap-2`}>
                    <Input
                      size="lg"
                      label={
                        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                          ราคาทอง
                        </div>
                      }
                      endContent={<div className=" text-xs">บาท</div>}
                      labelPlacement="outside"
                      placeholder=" "
                    />
                    <Select
                      aria-label="เลือกประเภททอง"
                      label={
                        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                          ประเภททอง
                        </div>
                      }
                      labelPlacement="outside"
                      //onChange={(e) => handleOptionChange(e)}
                      className=" w-full"
                      selectedKeys={option}
                      size="lg"
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

                <div className="flex-1">
                  <div className={`flex items-center w-full gap-2`}>
                    <Input
                      size="lg"
                      label={
                        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                          เปอร์เซ็นต์ทอง
                        </div>
                      }
                      endContent={<div className=" text-xs">%</div>}
                      labelPlacement="outside"
                      placeholder=" "
                    />
                    <Input
                      size="lg"
                      label={
                        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                          ราคาบวก
                        </div>
                      }
                      endContent={<div className=" text-xs">บาท</div>}
                      labelPlacement="outside"
                      placeholder=" "
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className={`flex items-center w-full gap-2`}>
                    <Input
                      size="lg"
                      label={
                        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                          น้ำหนักทอง
                        </div>
                      }
                      endContent={<div className=" text-xs">กรัม</div>}
                      labelPlacement="outside"
                      placeholder=" "
                    />
                    <Input
                      size="lg"
                      label={
                        <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                          ราคาที่ต้องการ
                        </div>
                      }
                      endContent={<div className=" text-xs">บาท</div>}
                      labelPlacement="outside"
                      placeholder=" "
                    />
                  </div>
                </div>

                <Input
                  size="lg"
                  label={
                    <div className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent font-bold">
                      รายละเอียด
                    </div>
                  }
                  labelPlacement="outside"
                  placeholder=" "
                />
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="light" onPress={onClose}>
                  ปิด
                </Button>
                <Button color="warning" onPress={onClose}>
                  บันทึกรายการ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
