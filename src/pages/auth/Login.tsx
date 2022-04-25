import useForm from "../../hooks/useForm";
import React from "react";
import { UserContext } from "../../context/UserContext";
import { Flex, Stack } from "@chakra-ui/react";
import Input from "../../components/forms/Input";
import { Error } from "../../components/helps/Error";
import Button from "../../components/forms/Buton";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const email = useForm("email");
  const password = useForm("password");
  const { userLogin, error, loading } = React.useContext(UserContext);

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
          <Input label="Email" type="email" name="email" placeholder="exemplo@gmail.com" {...email} />
          <Input label="Senha" type="password" name="password"  placeholder='***********'{...password} />
        </Stack>
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
          <Button
            mt="6"
            variant="solid"
            size="lg"
            onClick={() => navigate('/register')}
          >
            Criar Conta
          </Button>
        <Error error={error} />
      </Flex>
    </Flex>
  );
}

export default Login;
