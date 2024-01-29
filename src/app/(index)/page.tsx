import { Container, Box } from "@chakra-ui/react";
import MultiStep from "@/components/MultiStep";
import NameForm from "./NameForm";
import JobForm from "./JobForm";

export default function Home() {
  return (
    <Container flexDirection="column" maxW="full">
      <Box maxW="full">
        <MultiStep>
          <NameForm />
          <JobForm />
        </MultiStep>
      </Box>
    </Container>
  );
}
