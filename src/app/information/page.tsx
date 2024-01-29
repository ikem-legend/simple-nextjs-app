"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useQuery } from "@apollo/client";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { GET_CHARACTERS } from "@/lib/hooks/queries";
import useUser from "@/lib/hooks/useUser";
import TableWrapper from "@/components/table/Table";
import InformationRow, { InformationData } from "./row";
import InformationModal from "./modal";

export default function InformationPage() {
  const headers = [
    { title: "Name" },
    { title: "Status" },
    { title: "Species" },
    { title: "Location" },
  ];
  const [modalData, setModalData] = useState<InformationData>({
    name: "",
    status: "",
    species: "",
    location: { name: "" },
    origin: {
      name: "",
    },
  });
  const { user, isLoading } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  const displayDetails = (detailsData: InformationData) => {
    setModalData(detailsData);
    onOpen();
  };

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect if no user information is found
      return redirect("/");
    }
  }, [user, isLoading]);

  if (loading) {
    return (
      <Container flexDirection="column" maxW="full">
        <Box
          maxW="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text>Loading</Text>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container flexDirection="column" maxW="full">
        <Box
          maxW="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text>Error loading page. Please try again</Text>
          <Text>
            <Button onClick={refetch}>Retry</Button>
          </Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container flexDirection="column" maxW="full">
      <Box maxW="full">
        <Box p={2}>
          <Heading as="h6" textAlign="center">
            Rick and Morty characters
          </Heading>
        </Box>
        <TableWrapper
          headers={headers}
          Row={InformationRow}
          onRowClick={displayDetails}
          data={data.characters.results}
        />
        <InformationModal
          isOpen={isOpen}
          onClose={onClose}
          data={modalData}
          header="Character details"
        />
      </Box>
    </Container>
  );
}
