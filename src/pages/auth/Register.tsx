import React from "react";
import Buton from "../../components/forms/Buton";
import { UserContext } from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import { Error } from "../../components/helps/Error";
import Input from "../../components/forms/Input";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const nome = useForm("nome");
  const email = useForm("email");
  const password = useForm("password");
  const { userRegister, error, loading } = React.useContext(UserContext);

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
        <Text fontSize="xl" display="flex" justifyContent="center">
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
          <Buton disabled>Carregando...</Buton>
        ) : (
          <>
            <Buton mt="6" onClick={(e) => handleSubmit(e)}>
              Criar Conta
            </Buton>
            <Buton mt="4" onClick={() => navigate("/")}>
              Voltar
            </Buton>
          </>
        )}
        <Error error={error} />
      </Flex>
    </Flex>
  );
}

export default Register;
