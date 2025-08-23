import EComNavBar from "./component/navbar";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" flex w-full flex-col items-center min-h-screen bg-black">
      <EComNavBar/>
      <div className=" flex w-full flex-col items-center pt-5">
        {children}
      </div>
    </section>
  );
}
