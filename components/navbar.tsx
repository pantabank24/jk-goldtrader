"use client"

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { IoMdMenu } from "react-icons/io";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
  FacebookIcon,
  LineIcon,
} from "@/components/icons";
import Image from "next/image";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, useDisclosure, DropdownSection} from "@heroui/react";
import LoginModal from "./login-modal";

export const Navbar = () => {
  const {
    isOpen: isLoginOpen, 
    onOpen: onLoginOpen, 
    onOpenChange: onLoginOpenChange
  } = useDisclosure();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar className=" bg-[#710711]" maxWidth="xl" position="sticky"  >
      <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image width={60} height={60} src="/images/jk-icon.jpg" alt="banner"/>
            <p className="font-bold text-inherit text-white">จ่าคิง ปากพนัง</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className=" sm:flex basis-1/5 sm:basis-full max-sm:hidden"
        justify="end"
      >
        <NavbarItem className=" flex gap-4 bg-white/20 px-3 py-2 rounded-full">
          <Link isExternal aria-label="Facebook" href={siteConfig.links.facebook}>
            <Image src="/images/facebook.png" alt="facebook" width={30} height={30}/>
          </Link>
          <Link isExternal aria-label="Line" href={siteConfig.links.line}>
            <Image src="/images/line.png" alt="facebook" width={30} height={30}/>
          </Link>
          {/* <ThemeSwitch /> */}
        </NavbarItem>
        <Button className="bg-green-500" radius="full">
                <div>ลงชื่อเข้าใช้</div>
        </Button>
      </NavbarContent>

      <div className=" sm:hidden">
        <Dropdown placement="bottom-end" backdrop="blur">
          <DropdownTrigger>
              <IoMdMenu size={32}/>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className=" mb-2 bg-white/5 p-3">
              <div className=" flex flex-col">
                <span className="font-semibold whitespace-pre-line">{`ลงชื่อเข้าใช้งาน\nเพื่อเข้าสู่ระบบขายทอง`}</span>
                <Button onClick={() => onLoginOpen()} className="bg-green-500 mt-2" radius="sm">
                  <div>ลงชื่อเข้าใช้เลย</div>
                </Button>
              </div>
            </DropdownItem>
            <DropdownSection title="ช่องทางการติดต่อ">
              <DropdownItem key={"fb"} href={siteConfig.links.facebook} >
                <div className=" flex flex-row items-center">
                  <Image src="/images/facebook.png" alt="facebook" width={30} height={30}/>
                  <span className=" ml-3">Facebook</span>
                </div>
              </DropdownItem>
              <DropdownItem key={"li"} href={siteConfig.links.line} >
                <div className=" flex flex-row items-center">
                  <Image src="/images/line.png" alt="facebook" width={30} height={30}/>
                  <span className=" ml-3">Line</span>
                </div>
              </DropdownItem>
            </DropdownSection>
            
          </DropdownMenu>
        </Dropdown>
      </div>

      <LoginModal mIsOpen={isLoginOpen} mOnOpenChange={onLoginOpenChange}/>     

    </HeroUINavbar>
  );
};
