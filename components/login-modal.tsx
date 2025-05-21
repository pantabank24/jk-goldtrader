import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal"
import Image from "next/image"

interface Props {
    mIsOpen: boolean;
    mOnOpenChange: () => void;
}

const LoginModal = ({mIsOpen, mOnOpenChange}: Props) => {
    return (
        <Modal placement="center" className=" py-5" isOpen={mIsOpen} onOpenChange={mOnOpenChange} backdrop="blur" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center items-center">
                <Image src="/images/jk-icon.jpg" alt="icon" width={150} height={100} className=" rounded-full"/>
                <span className=" mt-2 text-xl">ลงชื่อเข้าใช้</span>
              </ModalHeader>
              <ModalBody>
                <Input placeholder="ชื่อผู้ใช้"  className=" min-w-80 text-base"  />
                <Input placeholder="รหัสผ่าน"  className=" min-w-80 text-base"  />
              </ModalBody>
              <ModalFooter>
                <Button className="bg-yellow-600  w-full" onPress={onClose}>
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}

export default LoginModal;