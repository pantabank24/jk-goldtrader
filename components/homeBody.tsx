import { blogs } from "@/app/blog/blogs";
import { Button } from "@heroui/button";

interface Props {
  pageType?: "silver" | "gold" | "palladium" | "platinum";
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
          className=" flex w-full rounded-3xl lg:w-1/2 pointer-events-none"
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
          ข่าวสารประชาสัมพันธ์จาก ร้านชินราชา
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
          <span className="  text-3xl bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold mb-2">
            พิกัดร้าน
          </span>
          <span className="  text-md bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold text-start">
            สาขาตลาดทิพย์เนตรเชียงใหม่
          </span>
          <span className="  text-md bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold text-start mb-5">
            เปิดทุกวัน 09.00 น. - 18.00 น.
          </span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d236.09388863310835!2d98.9804231!3d18.775759!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da312d919f5271%3A0x63520f1bc331561f!2z4Lij4LmJ4Liy4LiZ4LiK4Li04LiZ4Lij4Liy4LiK4LiyIOC5gOC4iuC4teC4ouC4h-C5g-C4q-C4oeC5iCDguKPguLHguJrguYDguIrguYfguITguYDguJvguK3guKPguYzguYDguIvguYfguJnguJfguK3guIcg4Lij4Lix4Lia4LiL4Li34LmJ4Lit4LiX4Lit4LiHIOC4meC4suC4hCDguYDguIfguLTguJkg4Lie4Lij4Liw4LmA4LiE4Lij4Li34LmI4Lit4LiH!5e0!3m2!1sen!2sth!4v1766590936290!5m2!1sen!2sth"
            width="600"
            height="450"
            loading="lazy"
            className=" rounded-3xl w-full pointer-events-none"
          ></iframe>
          <span className="  text-md bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold text-start mt-5">
            สาขาตลาดจตุจักร ลำพูน (ทางเข้าตลาด ใกล้พระพรหม)
          </span>
          <span className="  text-md bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent font-bold text-start mb-5">
            เปิดทุกวัน 09.30 น. - 18.00 น.
          </span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3782.3340198028964!2d99.036664!3d18.558974000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDMzJzMyLjMiTiA5OcKwMDInMTIuMCJF!5e0!3m2!1sen!2sth!4v1766591056115!5m2!1sen!2sth"
            width="600"
            height="450"
            loading="lazy"
            className=" rounded-3xl w-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
