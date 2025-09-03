"use client";

import SignInBadge from "@/components/sign-in";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function EComNavBar() {
  return (
    <Navbar
      isBordered
      className=" bg-[#710711]/80 backdrop-blur-lg shadow-lg fixed"
    >
      <NavbarBrand>
        <img src="/images/JKLOGO.png" alt="logo" className=" w-8" />
        <div className=" flex flex-col">
          <span className="font-bold  text-xl ml-3 bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-transparent">
            จ่าคิง ปากพนัง
          </span>
          <span className="font-bold  text-xs ml-3 mt-[-5] bg-gradient-to-b from-yellow-100 to-yellow-600 bg-clip-text text-transparent">
            รับสกัดทอง รับซื้อทองคำ ทุกประเภท
          </span>
        </div>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          <SignInBadge />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
