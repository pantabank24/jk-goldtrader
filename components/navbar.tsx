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

export const Navbar = () => {
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
    <HeroUINavbar className=" bg-[#710711]" maxWidth="xl" position="sticky" >
      <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-1" href="/">
            <img alt="" src="https://scontent.fbkk22-6.fna.fbcdn.net/v/t39.30808-6/469715516_122106781766650734_32385465079353714_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGqay0_VNyzz8pBbeFx7tPmBwq9aCqhgDQHCr1oKqGANKET4WqYsuxUE4q3eMFPRcqqQenkfMTBIxuE8W1aokpO&_nc_ohc=cK-nGKN0UYkQ7kNvwGQtM3n&_nc_oc=AdkDmdBwXneKOT082pVUjCOQ9ci9nM-aY1gTgztNXhIj6oIyEaAxoHHPHK4PrVxUTxc&_nc_zt=23&_nc_ht=scontent.fbkk22-6.fna&_nc_gid=R6O4Cty5sUnk8I2Dj-nOPA&oh=00_AfI6N9LzRiipe_OMISH_Ss2UGK5jGlFj8nCDiovShYUh3g&oe=68204045" 
              className=" w-16 h-16"/>
            <p className="font-bold text-inherit text-white">จ่าคิง ปากพนัง</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-white",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className=" sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className=" flex gap-2">
          <Link isExternal aria-label="Facebook" href={siteConfig.links.facebook}>
            <FacebookIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Line" href={siteConfig.links.line}>
            <LineIcon className="text-default-500" />
          </Link>
          {/* <ThemeSwitch /> */}
        </NavbarItem>
      </NavbarContent>

      {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent> */}

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
