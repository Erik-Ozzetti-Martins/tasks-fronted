import { Flex, useBreakpointValue } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "context/UserContext";
import { Button } from "../forms";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

function Header() {
  const navigate = useNavigate();
  const { login, userLogout, data, loading } = useContext(UserContext);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      {!loading && login && (
        <Flex
          as="header"
          w="100%"
          h="20"
          mx="auto"
          px="6"
          align="center"
          bg="gray.700"
        >
          <Logo />
          {isWideVersion && <SearchBox />}
          <Flex align="center" ml="auto">
            <Button variant="outline" onClick={() => navigate("/task")} mr="18">
              Criar task
            </Button>
            <Button variant="outline" onClick={() => userLogout()} mr="18">
              deslogar
            </Button>
            <Profile
              nome={data?.nome}
              email={data?.email}
              showProfileData={isWideVersion}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default Header;
