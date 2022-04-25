import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
  nome?: string;
  email?: string;
}

export function Profile({ showProfileData, nome, email }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text color="white">{nome}</Text>
          <Text color="white">{email}</Text>
        </Box>
      )}
      <Avatar size="md" name={nome} />
    </Flex>
  );
}
