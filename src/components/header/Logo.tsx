import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text  ml="4" fontSize={["2xl", "3xl"]} fontWeight="bold" letterSpacing="tight"  color="white" w="64">
      salvatarefa
      <Text as="span" ml="1" color="red.400">
        .
      </Text>
    </Text>
  );
}
