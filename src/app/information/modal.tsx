import ModalWrapper from "@/components/Modal";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { InformationData } from "./row";

type InformationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: InformationData;
  header?: string;
};

export default function InformationModal({
  isOpen,
  onClose,
  data,
  header,
}: InformationModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} header={header} size="xl">
      <SimpleGrid columns={2} spacing={10}>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Name</Text>
          <Text>{data.name}</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Status</Text>
          <Text>{data.status}</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Species: {data.species}</Text>
          <Text>{data.species}</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Location</Text>
          <Text>{data.location.name}</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text fontWeight={600}>Origin</Text>
          <Text>{data.origin.name}</Text>
        </Box>
      </SimpleGrid>
    </ModalWrapper>
  );
}
