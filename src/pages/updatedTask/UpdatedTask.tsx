import {
  Flex,
  Stack,
  Text,
  Textarea,
  Input as ChakraInput,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/forms/Buton";
import { useContextTask } from "../../context/TaskContext";
import { TASK_PUT } from "../../service/api";

interface IImg {
  raw: File | null;
  preview: string;
}

export function UpdatedTask() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [img, setImg] = useState<IImg>({} as IImg);
  const [descricao, setDescricao] = useState("");
  const { tasks, updatedTask } = useContextTask();

  const taskCurrent = tasks.filter((task) => String(task.id) === id)[0];


  useEffect(() => {
    if (taskCurrent) {
      setDescricao(taskCurrent.descricao);
      setNome(taskCurrent.nome);
      setImg({ preview: taskCurrent?.url as string, raw: null });
      //setImg({ preview: taskCurrent.url, raw: null });
    }
  }, [taskCurrent]);

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    if (nome && descricao && img.raw && id) {
      const token = window.localStorage.getItem("token");
      let formData = new FormData();
      formData.append("foto", img.raw);
      formData.append("nome", nome);
      formData.append("descricao", descricao);
      const { url, options } = TASK_PUT(formData, token, id);
      await fetch(url, options);
      updatedTask({ id: String(id), nome, descricao, url: img.preview });
      navigate("/home");
    }

  }

  /*
  async function task() {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const { url, options } = TASK_GET(token, id);
        const taskResponse = await fetch(url, options);
        if (!taskResponse.ok) throw new Error("token invalido");
        const dados = await taskResponse.json();
        console.log(dados);
        setNome(dados.nome);
        setDescricao(dados.descricao);
        setImg({ preview: dados.url, raw: null });
      } catch (error) {}
    } else {
      return navigate("");
    }
  }
  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (nome && descricao && img.raw) {
      const token = window.localStorage.getItem("token");
      let formData = new FormData();
      formData.append("foto", img.raw);
      formData.append("nome", nome);
      formData.append("descricao", descricao);
      const { url, options } = TASK_PUT(formData, token, id);
      await fetch(url, options);
      navigate("/home");
    }
  }
*/
  function handleImgChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImg({
        preview: URL.createObjectURL(target?.files[0]),
        raw: target?.files[0],
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
          <ChakraInput
            color="black"
            type="text"
            value={nome}
            placeholder="teste"
            onChange={(e) => setNome(e.target.value)}
          />
          <Textarea
            placeholder="Here is a sample placeholder"
            bg="gray.200"
            size="md"
            resize="none"
            color="black"
            value={descricao}
            h="8"
            onChange={(e) => setDescricao(e.target.value)}
          />
          <ChakraInput
            type="file"
            name="foto"
            {...img}
            onChange={handleImgChange}
          />
          <img src={img.preview} alt="task create" />
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
