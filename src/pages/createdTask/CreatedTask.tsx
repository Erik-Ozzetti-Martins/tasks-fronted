import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Flex,
  Stack,
  Text,
  Textarea,
  Input as ChakraLink,
} from "@chakra-ui/react";

import { Input } from "components/forms";
import useForm from "hooks/useForm";
import { TASK_POST } from "service";
import { useContextTask } from "context/TaskContext";

interface IFoto {
  raw: File;
  preview: string;
}

export function CreatedTask() {
  const navigate = useNavigate();

  const nome = useForm("nome");
  const [foto, setFoto] = useState<IFoto>({} as IFoto);
  const [descricao, setDescricao] = useState("");
  const { createdTask } = useContextTask();

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    if (nome.validate()) {
      const token = window.localStorage.getItem("token");
      console.log("Passou  por aqui criar post");
      let formData = new FormData();
      formData.append("foto", foto.raw);
      formData.append("nome", nome.value);
      formData.append("descricao", descricao);

      const { url, options } = TASK_POST(formData, token);
      const response = await fetch(url, options);
      const json = await response.json();
      createdTask({
        id: String(json.id),
        nome: json.name,
        descricao: json.descricao,
        url: json.url,
      });
      navigate("/home");
    }
  }
  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setFoto({
        preview: URL.createObjectURL(target?.files[0]),
        raw: target.files[0],
      });
    }
  }

  return (
    <Flex w="100wv" h="90vh" align="center" justify="center">
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
            placeholder="teste"
            {...nome}
          />
          <Textarea
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Here is a sample placeholder"
            bg="gray.50"
            size="md"
            resize="none"
            h="8"
          />
          <ChakraLink
            type="file"
            name="foto"
            {...foto}
            onChange={handleImgChange}
          />
          {foto.preview && <img src={foto.preview} alt="task create" />}
        </Stack>
        <>
          <Button mt="6" bg="teal.400" onClick={(e) => handleSubmit(e)}>
            Criar task
          </Button>
          <Button mt="4" bg="teal.400" onClick={() => navigate("/home")}>
            Voltar
          </Button>
        </>
      </Flex>
    </Flex>
  );
}
