import { blogs } from "@/app/blog/blogs";
import { Button } from "@heroui/button";

interface Props {
  pageType?: string;
}

export const HomeBody = ({ pageType }: Props) => {
  return (
    <div>
      <div className=" lg:hidden flex flex-col gap-y-4 w-full items-center justify-center px-5">
        <span className="text-3xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          กราฟตอนนี้
        </span>
        <iframe
          src={
            pageType === "silver"
              ? "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_8d6d1&symbol=FOREXCOM%3AXAGUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
              : pageType === "palladium"
                ? "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_palladium&symbol=OANDA%3AXPDUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
                : pageType === "platinum"
                  ? "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_platinum&symbol=OANDA%3AXPTUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
                  : "https://s.tradingview.com/widgetembed/?frameElementId=tradingview_8d6d1&symbol=FOREXCOM%3AXAUUSD&interval=1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0a0a0a&studies=[]&theme=dark&style=1&timezone=Asia%2FBangkok&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=th"
          }
          className=" flex w-full rounded-3xl lg:w-1/2 relative z-0 pointer-events-none"
          height="500"
          scrolling="no"
        ></iframe>
      </div>

      <div className="relative flex w-full py-16 bg-white/5 mt-10 flex-col items-center px-5">
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-t from-transparent to-black" />
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
                {/* <Button
                  className="  font-bold backdrop-blur-xl border border-white/20 bg-gradient-to-b from-transparent to-yellow-500/50"
                  onPress={() => handleSetBlog(index)}
                >
                  อ่านเพิ่มเติม
                </Button> */}
              </div>
            </div>
          ))}
        </div>

        <div className=" w-full lg:w-1/2 mt-20 md:mt-32  flex items-center justify-center flex-col">
          <span className="  text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold mb-10">
            พิกัดร้าน
          </span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1385511240396!2d100.4832685!3d6.992958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d2900676a2e5b%3A0x8de82dc653f1f271!2zS0sg4Lir4Lil4Lit4Lih4LiX4Lit4LiH4Lir4Liy4LiU4LmD4Lir4LiN4LmIIOC4guC5ieC4suC4h-C5gOC4i-C4meC4l-C4o-C4seC4peC5gOC4n-C4quC4leC4tOC4p-C4seC4peC4q-C4suC4lOC5g-C4q-C4jeC5iA!5e0!3m2!1sen!2sth!4v1766598349637!5m2!1sen!2sth"
            width="600"
            height="450"
            loading="lazy"
            className=" rounded-3xl w-full relative z-0 pointer-events-none"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
