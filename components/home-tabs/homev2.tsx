import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  Star,
  MapPin,
  Camera,
  Zap,
  Shield,
  ArrowUp,
  ArrowDown,
  FilePlus,
} from "lucide-react";
import Image from "next/image";
import { PriceDto } from "@/app/models/Models";
import { QuotationModel } from "@/app/models/Quotations";
import {
  Button,
  CircularProgress,
  Input,
  Select,
  SelectItem,
  Skeleton,
  useDisclosure,
} from "@heroui/react";
import moment from "moment";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";

interface Screen {
  id: number;
  bg: string;
  title: string;
  subtitle: string;
  icon: React.ReactElement;
  description: string;
}

interface Props {
  data?: PriceDto;
  isLoading: boolean;
  service: number;
  currentQuots: (data?: QuotationModel) => void;
  error?: any;
}

const HomeV2 = ({ data, isLoading, service, currentQuots, error }: Props) => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = React.useState("3");
  const [calc, setCalc] = React.useState(0);
  const [gram, setGram] = React.useState<string | null>("1");
  const [plus, setPlus] = React.useState<string | null>("0");
  const [percent, setPercent] = React.useState("90");
  const [currentQuot, setCurrentQuot] = useState<QuotationModel>();

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  const handleOptionChange = (val: React.ChangeEvent<HTMLSelectElement>) => {
    if (val.target.value !== option && val.target.value) {
      setOption(val.target.value);
    }
  };

  useEffect(() => {
    calcPrice();
  }, [data, gram, plus, percent, option]);

  const scrollToSection = (index: number): void => {
    const container = containerRef.current;
    if (!container) return;

    const targetY = index * container.clientHeight;
    container.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const scrollToTop = (): void => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
    // addToast({
    //       hideIcon: true,
    //       title: "เพิ่มลงในใบเสนอราคาเรียบร้อย",
    //       description: `คุณได้เพิ่มรายการ ${currentQuot?.goldType} ${currentQuot?.percentage}% น้ำหนัก ${currentQuot?.laborCost} กรัม ราคาประเมิน ${currentQuot?.totalAmount.toLocaleString()} บาท กรุณาตรวจสอบในเมนูใบเสนอราคา`,
    //       radius: "lg",
    //       classNames: {
    //         icon: "backdrop-blur-xl border border-white/20"
    //       }
    //     })
  };

  const validatePercentInput = (i: string) => {
    if (/^\d*\.?\d*$/.test(i)) {
      if (parseInt(i) > 100) {
        setPercent("100");
      } else if (parseInt(i) < 0) {
        setPercent("");
      } else {
        setPercent(i);
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

  const calcPrice = () => {
    if (gram == "") {
      setGram(null);
    }

    var goldPrice = data?.gold965.ask ?? 0;
    var gramPrice = (data?.gold965.ask ?? 0) / 15.2;
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
        setCalc(goldPrice * service * 0.97 * parseFloat(gram ?? "0"));
        setCurrentQuot({
          goldType: "ทองรูปพรรณ",
          goldPrice: goldPrice,
          weightBaht: 0,
          percentage: 96.5,
          laborCost: parseFloat(gram ?? "0"),
          costPerBaht: parseFloat((goldPrice * service * 0.97).toFixed(2)),
          totalAmount: parseFloat(
            (goldPrice * service * 0.97 * parseFloat(gram ?? "0")).toFixed(2)
          ),
        });
        break;
      case "3":
        var calcs = 0;
        if (parseFloat(percent) > 99 && gram != null) {
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
        } else if (parseFloat(percent) > 30 && gram != null) {
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
        } else if (parseFloat(percent) <= 30 && gram != null) {
          calcs =
            goldPrice *
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
              (goldPrice * service * (parseFloat(percent) / 100)).toFixed(2)
            ),
            totalAmount: parseFloat(
              (
                goldPrice *
                service *
                (parseFloat(percent) / 100) *
                parseFloat(gram ?? "0")
              ).toFixed(2)
            ),
          });
        }
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

  const blogs = [
    {
      title: "ราคาประเมินทองคำของเว็ปไซต์",
      author_img: "/images/owner.png",
      author_name: "จ่าคิง ปากพนัง",
      description:
        "ราคาทองคำที่ทางเราประเมินให้ไป เป็นราคาตามเปอร์เซ็นจริงของทองคำที่ท่านใส่ข้อมูลมา ทองคำบางประเภท เช่น ทองคำผสมที่ผ่านการหลอมรวมมา จะมีการบวกให้ตั้งแต่ 500 - 1500 บาท ต่อบาท ทองทำที่ยังไม่ผ่านการหลอมเหลวรวมกับเป็นก้อน บางชิ้น อาจจะมีการหักค่าน้ำประสานทอง บางชิ้นอาจจะไม่มีการหักค่าน้ำประสานทอง ทุกอย่างขึ้นอยู่กับรูปแบบของชิ้นงาน การที่จะได้ราคาที่ถูกต้อง และแม่นยำ จำเป็นต้องนำมาให้างเราตรวจสอบโดยใช้วิธีการ X-Ray ผ่านเครื่องมือการตรวจสอบค่าโลหะ อย่างละเอียด ถึงจะแม่นยำ และได้ราคาสูงสุด ทั้งนี้ หากท่านไหนไม่สะดวกจะนำชิ้นงานของท่านเข้ามาที่ร้าน ท่านสามารถส่งรูปภาพ น้ำหนัก เบื้องต้นมาทาง Line official ของทางร้านได้เลย ทางร้านจะมีแอดมินคอยตอบคำถามเชิงลึกให้ท่านอยู่ 24 ชั่วโมงครับ ขอบคุณที่ท่านเลือกให้เราดูแลท่าน",
      img: "/images/fischer.png",
      created_at: "2025-05-11",
    },
    // {
    //   title: "🔥รู้ก่อนขายได้ตังค์เพิ่มอีกเยอะ🔥",
    //   author_img: "/images/owner.png",
    //   author_name: "จ่าคิง ปากพนัง",
    //   description: "🟢 วิธีคำนวนราคาทอง 🟢 \nราคาทองวันนี้ x 0.0656 x (% ทองจริง x น้ำหนักทอง) = ราคาทองที่จะได้รับ \n\nหน้าร้านอยู่ที่ลาดพร้าว 129 ไม่สะดวกมา โทรมาปรึกษากัน แล้วส่งพัสดุมาได้ ทางร้านยินดีดูแลให้ครับ",
    //   img: "/images/jk-manygold.png",
    //   created_at: "2025-05-11"
    // }
  ];

  const handleSetBlog = (index: number) => {
    setBlog(blogs[index]);
    onOpen();
  };

  const [blog, setBlog] = React.useState<any>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="h-screen w-full relative lg:hidden">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <div
          className={`h-screen w-full flex flex-col items-center justify-start text-white relative bg-black px-4`}
          style={{ scrollSnapAlign: "start" }}
        >
          <div className=" fixed w-full h-96">
            <div
              className="absolute inset-0 bg-cover bg-black bg-center bg-no-repeat  transition-all duration-300"
              style={{ backgroundImage: `url(images/banner2.jpg)` }}
            />
            <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-black to-transparent flex items-end" />
          </div>

          <div className=" flex flex-col h-full  w-96 px-2 lg:flex-row gap-x-4 gap-y-4 items-center justify-center -mt-4 ">
            <div className=" flex flex-col  gap-y-4 w-full items-center justify-center">
              <div className=" flex w-full text-center flex-col justify-center rounded-3xl py-2 px-5 backdrop-blur-md border border-yellow-300/20 bg-black/10   ">
                <span className=" font-bold text-2xl bg-gradient-to-b from-yellow-300 to-yellow-900 bg-clip-text text-transparent mb-1  ">
                  ทองคำเเท่ง 96.5%
                </span>
                <div className=" grid grid-cols-2  gap-x-4">
                  <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-red-900 flex flex-col items-center py-5 rounded-2xl h-24 justify-center">
                    {isLoading ? (
                      <CircularProgress
                        aria-label="Loading..."
                        color="warning"
                      />
                    ) : (
                      <div className=" flex flex-col items-center ">
                        <span className=" font-normal text-sm text-yellow-500">
                          ราคารับซื้อ
                        </span>
                        <span className=" text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
                          {(data?.gold965.ask ?? 0).toLocaleString(`th-TH`, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className=" font-normal text-sm text-yellow-500">
                          บาท
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="backdrop-blur-xl border border-white/20 bg-gradient-to-b from-black/90 to-red-900 flex flex-col items-center py-5 rounded-2xl h-24 justify-center">
                    {isLoading ? (
                      <CircularProgress
                        aria-label="Loading..."
                        color="warning"
                      />
                    ) : (
                      <div className=" flex flex-col items-center">
                        <span className=" font-normal text-sm text-yellow-500 ">
                          ราคาขาย
                        </span>
                        <span className=" text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
                          {(data?.gold965.bid ?? 0).toLocaleString(`th-TH`, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className=" font-normal text-sm text-yellow-500">
                          บาท
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

            <div className=" flex flex-col min-h-96 w-full justify backdrop-blur-xl border border-white/20 bg-gradient-to-b from-white/5 to-white/10 px-3 py-4 rounded-3xl ">
              <div className=" gap-3 flex flex-col items-center">
                <Select
                  aria-label="เลือกประเภททอง"
                  onChange={(e) => handleOptionChange(e)}
                  className="min-w-80"
                  selectedKeys={option}
                  size="lg"
                  classNames={{
                    trigger: "backdrop-blur-xl border border-white/10",
                    popoverContent:
                      "backdrop-blur-xl border border-white/50 bg-white/10",
                  }}
                >
                  {goldTypes.map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  ))}
                </Select>
                <div className={`flex items-center w-full gap-2`}>
                  {option === "8" || option === "3" || option === "4" ? (
                    <div className="flex-1">
                      {/* <span className=" bg-gradient-to-b from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-bold">เปอร์เซ็นต์ทอง (%)</span> */}
                      <Input
                        endContent="%"
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
                        endContent="บาท"
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

                <Input
                  endContent="กรัม"
                  label={
                    <div className=" bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text text-transparent font-bold">
                      น้ำหนักทอง
                    </div>
                  }
                  classNames={{
                    inputWrapper: "backdrop-blur-xl border border-white/10 ",
                  }}
                  size="lg"
                  className=" min-w-80 text-base "
                  step="1"
                  type="text"
                  inputMode="decimal"
                  min="0"
                  value={gram ?? ""}
                  onValueChange={(e) => validateGramInput(e)}
                />
              </div>

              <div className="mt-5 flex">
                <div className=" flex flex-col w-full items-center justify-center backdrop-blur-xl border border-white/20  text-white bg-gradient-to-b from-black/80 to-orange-950/70 rounded-2xl py-5">
                  <span className=" flex text-center">ราคาประเมิน</span>
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

              <div className=" flex flex-row gap-x-2">
                <Button
                  as="a"
                  href="https://lin.ee/XukDRz8"
                  className=" w-full hover:scale-105 backdrop-blur-xl border-2 border-white/20 flex h-14  mt-5  bg-gradient-to-b from-green-500 to-green-700 text-xs"
                  radius="full"
                >
                  <img
                    alt=""
                    width={25}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/LINE_New_App_Icon_%282020-12%29.png/500px-LINE_New_App_Icon_%282020-12%29.png"
                  />
                  <div>สนใจซื้อขาย คลิกที่นี่</div>
                </Button>
                {isLoading == false ? (
                  <button
                    onClick={() => handleQuote()}
                    className=" w-full mt-5 h-14 justify-center backdrop-blur-xl border  border-white/20 bg-gradient-to-b from-black/5 to-white/10 text-white  rounded-full transition-all duration-200 hover:scale-105 flex flex-row items-center "
                  >
                    <FilePlus size={20} />
                    <span className=" pl-2 text-xs">เพิ่มลงในใบเสนอราคา</span>
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/*content*/}
        </div>
        <div
          className={`min-h-screen  w-full flex flex-col items-center justify-center text-white relative bg-transparent backdrop-blur-lg `}
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="inline-block text-center justify-center w-full mt-20 mb-7 flex flex-col"></div>

          <div className=" lg:hidden flex flex-col gap-y-4 w-full items-center justify-center px-5">
            <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              กราฟทองตอนนี้
            </span>
            <iframe
              src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_8d6d1&symbol=FOREXCOM%3AXAUUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
              className=" flex w-full rounded-3xl lg:w-1/2"
              height="500"
              scrolling="no"
            ></iframe>
          </div>

          <div className="relative flex w-full py-16  mt-10 flex-col items-center px-5">
            <span className="  text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
              บทความ
            </span>
            <span className=" mb-10 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold ">
              ข่าวสารประชาสัมพันธ์จาก KK หลอมทอง
            </span>

            <div className=" w-full lg:w-1/2">
              {blogs.map((i, index) => (
                <div
                  key={index}
                  className=" flex flex-col xl:flex-row rounded-2xl backdrop-blur-xl border border-white/20 bg-gradient-to-b from-white/5 to-white/10 items-center justify-center "
                >
                  <img
                    className="h-72 max-xl:w-full object-cover rounded-xl "
                    alt="fischer"
                    src={i.img}
                  />
                  <div className=" flex flex-col items-end justify-center py-4 px-4">
                    <span className=" w-full h-full text-sm whitespace-pre-line ">
                      {i.description}
                    </span>
                    <Button
                      className="  font-bold backdrop-blur-xl border border-white/20 bg-gradient-to-b from-transparent to-yellow-500/50"
                      onPress={() => handleSetBlog(index)}
                    >
                      อ่านเพิ่มเติม
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className=" w-full lg:w-1/2 mt-20 md:mt-32  flex items-center justify-center flex-col">
              <span className="  text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold mb-10">
                พิกัดร้าน
              </span>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.1906687314067!2d100.64438107586528!3d13.767372496931236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d61e658c0eb4f%3A0xa6559716dcd55c86!2z4LiI4LmI4Liy4LiE4Li04LiHIOC4m-C4suC4geC4nuC4meC4seC4hw!5e0!3m2!1sen!2sth!4v1751569935480!5m2!1sen!2sth"
                width="600"
                height="450"
                loading="lazy"
                className=" rounded-3xl w-full"
              ></iframe>
            </div>
          </div>

          <footer className="w-full flex items-center justify-center py-10 flex-col bg-[#14100b]">
            <div className=" flex flex-row gap-x-2">
              <Image
                className=" rounded-full"
                alt="jkChill"
                src="/images/owner.png"
                width={50}
                height={50}
              />
              <div className=" flex flex-col">
                <span className="text-default-600 text-lg bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold">
                  KK หลอมทอง by จ่าคิง ปากพนัง
                </span>
                <span className="text-default-600 text-sm">
                  ร้านเปิดทุกวัน 09:30-16:30 (แนะนำให้โทรนัดครับ)
                </span>
              </div>
            </div>
            <div className="  grid grid-cols-1 gap-x-2 gap-y-2 my-2 ">
              <Button
                color="primary"
                variant="flat"
                as="a"
                radius="full"
                href="tel:0639325566"
              >
                โทร 063-932-5566 (จ่าคิง)
              </Button>
              {/* <Button color="primary" variant="faded" as="a" radius="full"  target="_blank" href="https://maps.app.goo.gl/zFnoEgPjEydyLTQg6?g_st=il">
                  พิกัดร้าน : Google Maps
                </Button> */}
            </div>
            <div className="flex items-center gap-1 text-current">
              <p className=" font-bold bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text text-transparent">
                © 2025 KK หลอมทอง
              </p>
            </div>
            <div className="flex items-center gap-1 text-current mb-16">
              <p className="text-primary text-xs">
                Powered by pantadev (V 1.5 | July 24, 2025 Latest)
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white bg-opacity-20 backdrop-blur-lg p-4 rounded-full text-white hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110 z-20 shadow-lg"
          type="button"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default HomeV2;
