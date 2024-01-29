import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav>
        <Box
          display="flex"
          justifyContent="right"
          borderBottom="1px solid"
          borderBottomColor="gray.200"
        >
          <Text p={4} fontWeight={600}>
            <Link href="/profile">Profile</Link>
          </Text>
          <Text p={4} fontWeight={600}>
            <Link href="/information">Information</Link>
          </Text>
        </Box>
      </nav>
      {children}
    </section>
  );
}
