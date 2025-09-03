import EComNavBar from "./component/navbar";
import { SideBar } from "./component/sidebar";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" flex w-full flex-col items-center h-screen bg-black pt-16">
      <EComNavBar />
      <div className=" flex w-full h-full flex-row  py-5 px-2 lg:px-5 gap-x-5">
        <SideBar />
        {children}
      </div>
    </section>
  );
}
