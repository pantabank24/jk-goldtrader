import React, { useState } from "react";
import {
  MessageCircle,
  Minus,
  X,
  Send,
  Smile,
  Delete,
  BookmarkX,
} from "lucide-react";
import { QuotationModel } from "@/app/models/Quotations";
import { Button } from "@heroui/button";

// Types
interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
}

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface ChatWindowProps {
  //   contact: Contact;
  //   onClose: () => void;
  quotation?: QuotationModel[];
  onMinimize: () => void;
  isMinimized: boolean;
  callback: (data: QuotationModel[]) => void;
  trigger: () => void;
}

const QuotationTab: React.FC<ChatWindowProps> = ({
  quotation,
  onMinimize,
  isMinimized,
  callback,
  trigger,
}) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! How are you?", sender: "other", time: "2:30 PM" },
    {
      id: 2,
      text: "I'm good thanks! What about you?",
      sender: "me",
      time: "2:31 PM",
    },
    {
      id: 3,
      text: "Great! Working on some React components today",
      sender: "other",
      time: "2:32 PM",
    },
  ]);

  const sendMessage = (): void => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleHeaderClick = (): void => {
    onMinimize();
  };

  const handleMinimizeClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onMinimize();
  };

  const handleCloseClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    //onClose();
  };

  const [pQuot, setPQout] = useState<QuotationModel[]>([]);

  const handleDropIndex = (index: number) => {
    callback(quotation?.filter((_, i) => i != index) ?? []);
  };

  const handleSave = () => {
    trigger();
  };

  return (
    <div
      className={` max-lg:hidden fixed bottom-5 right-4 z-50 w-80  border-white/10 backdrop-blur-xl border rounded-xl shadow-2xl0 transition-all duration-300 ease-in-out ${isMinimized
          ? "h-12 bg-gradient-to-b from-red-200/20 to-yellow-400/20"
          : "h-[450px] max-h-[calc(100vh-20px)] bg-white/5"
        }`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-3  text-white rounded-xl cursor-pointer flex-shrink-0"
        onClick={handleHeaderClick}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <h3 className="font-medium text-sm flex flex-row">
              รายการใบเสนอราคา
              <div
                className={
                  quotation != null && quotation?.length > 0
                    ? ` bg-red-600 px-2 rounded-full ml-2`
                    : "ml-2"
                }
              >
                {quotation?.length}
              </div>
            </h3>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className="hover:bg-blue-700 p-1 rounded"
            onClick={handleMinimizeClick}
          >
            <Minus size={16} />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-48px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-14  min-h-0 scrollbar-hide">
            {(quotation?.length ?? 0 > 0) ? (
              <div>
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
              <div className="h-full flex w-full items-center justify-center flex-col gap-y-4">
                <BookmarkX size={80} />
                ยังไม่มีรายการ กรุณาเพิ่มที่หน้าแรกครับ
              </div>
            )}
          </div>
          {quotation != null && quotation?.length > 0 ? (
            <div className="absolute bottom-0 flex w-full">
              <div className=" backdrop-blur-sm rounded-b-xl bg-black/20 w-full flex flex-row justify-end items-center px-2 py-2">
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
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default QuotationTab;
