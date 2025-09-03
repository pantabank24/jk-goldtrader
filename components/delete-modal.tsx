import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

export const DeleteModal: React.FC<Props> = ({
  isOpen,
  onOpen,
  onOpenChange,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="sm"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1 text-red-500">
                <Trash2 /> ลบรายการนี้
              </ModalHeader>
              <ModalBody>
                <p>คุณต้องการลบรายการนี้หรือไม่ ?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  ปิด
                </Button>
                <Button className=" bg-red-600" onPress={onClose}>
                  ลบ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
