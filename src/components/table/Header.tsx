import { Tr, Th } from "@chakra-ui/react";

type HeaderProps = { headers: { title: string }[] };

export default function Header({ headers }: HeaderProps) {
  return (
    <Tr>
      {headers.map((header, index) => (
        <Th key={index}>{header.title}</Th>
      ))}
    </Tr>
  );
}
