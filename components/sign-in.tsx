import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
} from "@heroui/react";

export default function SignInBadge() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform lg:hidden"
            description=""
            name=""
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">ลงชื่อเข้าใช้แล้ว</p>
            <p className="font-bold">customer@gmail.com</p>
          </DropdownItem>
          <DropdownItem key="logout">
            <Button className="bg-red-600/50 flex w-full">Log Out</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform max-lg:hidden"
            description="weerachai@gmail.com"
            name="วีรชัย ชัยนุมาศ"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">ลงชื่อเข้าใช้แล้ว</p>
            <p className="font-bold">customer@gmail.com</p>
          </DropdownItem>
          <DropdownItem key="logout">
            <Button className="bg-red-600/50 flex w-full">Log Out</Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
