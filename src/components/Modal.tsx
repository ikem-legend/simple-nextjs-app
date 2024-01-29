"use client";

import { ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

type ModalProps = {
  header?: string;
  footer?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose(): void;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
};

export default function ModalWrapper({
  header,
  children,
  footer,
  isOpen,
  onClose,
  size = "md",
}: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
      {!!footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
}
