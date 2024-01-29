"use client";

import { Tr, Td } from "@chakra-ui/react";

export type InformationData = {
  name: string;
  status: string;
  species: string;
  location: { name: string };
  origin: {
    name: string;
  };
};

type InformationProps = {
  data: InformationData;
  onRowClick: (data: InformationData) => void;
};

export default function InformationRow({ data, onRowClick }: InformationProps) {
  return (
    <Tr onClick={() => onRowClick(data)} _hover={{ cursor: "pointer" }}>
      <Td>{data.name}</Td>
      <Td>{data.status}</Td>
      <Td>{data.species}</Td>
      <Td>{data.location.name}</Td>
    </Tr>
  );
}
