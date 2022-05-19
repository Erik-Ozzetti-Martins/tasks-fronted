import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Stack, Text } from "@chakra-ui/react";

import { useContextUser } from "context/UserContext";
import useForm from "hooks/useForm";

import { Error } from "components/helps/Error";
import { Input, Button } from "components/forms";

export function Register() {
  const { userRegister, error, loading } = useContextUser();
  const navigate = useNavigate();
  const nome = useForm("nome");
  const email = useForm("email");
  const password = useForm("password");

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (nome.validate() && email.validate() && password.validate()) {
      console.log(nome.value, email.value, password.value);
      userRegister({
        nome: nome.value,
        email: email.value,
        password: password.value,
      });
    }
  }

  const redirectLogin = () => navigate("/");

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
        <Text fontSize="xl" display="flex" justifyContent="center" color={'gray.900'}>
          Criar conta
        </Text>
        <Stack spacing="2">
          <Input
            type="text"
            label="Nome"
            name="nome"
            {...nome}
            placeholder="teste "
          />
          <Input
            type="email"
            label="E-mail"
            name="email"
            {...email}
            placeholder="example@gmail.com"
          />
          <Input
            type="password"
            label="Senha"
            name="password"
            {...password}
            placeholder="******"
          />
        </Stack>
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <>
            <Button mt="6" onClick={(e) => handleSubmit(e)}>
              Criar Conta
            </Button>
            <Button mt="4" onClick={redirectLogin}>
              Voltar
            </Button>
          </>
        )}
        <Error error={error} />
      </Flex>
    </Flex>
  );
}
