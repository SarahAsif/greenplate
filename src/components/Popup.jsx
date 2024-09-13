import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";

const Popup = ({ onClose, onConfirm, data, isOpen }) => {
  const { selectedVariations, setSelectedVariations } = useContext(AppContext);
  const handleSizeChange = (value) => {
    setSelectedVariations((prev) => ({
      ...prev,
      size: value,
    }));
  };

  const handleExtrasChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setSelectedVariations((prev) => ({
      ...prev,
      extras: checked
        ? [...prev.extras, value]
        : prev.extras.filter((extra) => extra !== value),
    }));
  };

  const handleConfirm = () => {
    onConfirm(selectedVariations);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose Variations</ModalHeader>
        <ModalBody>
          <RadioGroup
            onChange={handleSizeChange}
            value={selectedVariations.size}
          >
            <Stack spacing={4}>
              {["Small", "Medium", "Large"].map((size) => (
                <Radio key={size} value={size}>
                  {size}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          <Stack mt={6}>
            {["Extra Cheese", "Mushrooms", "Bacon"].map((extra) => (
              <Checkbox key={extra} value={extra} onChange={handleExtrasChange}>
                {extra}
              </Checkbox>
            ))}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleConfirm}>
            Add to Cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
