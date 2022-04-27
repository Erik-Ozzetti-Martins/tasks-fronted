import React from "react";

import { useNavigate } from "react-router-dom";
import { Flex, Stack } from "@chakra-ui/react";

import useForm from "hooks/useForm";

import { useContextUser } from "context/UserContext";

import { Input, Button } from "components/forms";
import { Error } from "components/helps/Error";

export function Login() {
  const { userLogin, error, loading } = useContextUser();

  const navigate = useNavigate();

  const email = useForm("email");
  const password = useForm("password");

  const redirectRegister = () => navigate("/register");

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (email.validate() && password.validate()) {
      userLogin({ email: email.value, password: password.value });
    }
  }

  return (
    <Flex w="100wv" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.100"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="1">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="exemplo@gmail.com"
            {...email}
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="***********"
            {...password}
          />
        </Stack>
        <Flex align="center" justify="center">
          <Error error={error} />
        </Flex>
        {loading ? (
          <Button
            mt="6"
            isLoading
            loadingText="Loading"
            colorScheme="teal"
            variant="outline"
            spinnerPlacement="start"
          />
        ) : (
          <Button
            mt="6"
            variant="solid"
            size="lg"
            onClick={(e) => handleSubmit(e)}
          >
            Entrar
          </Button>
        )}

        <Button mt="6" variant="solid" size="lg" onClick={redirectRegister}>
          Criar Conta
        </Button>
      </Flex>
    </Flex>
  );
}
