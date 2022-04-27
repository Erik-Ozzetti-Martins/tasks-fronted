import { Box, Image, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContextTask } from "../../context/TaskContext";
import { ICardProps } from "../../interfaces/types";

import { TASK_DELETE } from "../../service";
import { Button } from "../forms/Button";

function Card({ task, setRefrash }: ICardProps) {
  const navigate = useNavigate();
  const { deleteTask } = useContextTask();
  function AtualizarTask() {
    navigate(`/task/${task.id}`);
  }
  async function handleDeletarTask(id: string) {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { url, options } = TASK_DELETE(id, token);
      await fetch(url, options);
      deleteTask(id);
    }
  }
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" m="4" overflow="hidden">
      <Image m="auto" src={task.url} alt="imagem" />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {task.nome}
          </Box>
        </Box>
        <Box>
          <Box m="2" color="white" fontSize="sm">
            {task.descricao}
          </Box>
        </Box>
        <Stack>
          <Button onClick={() => AtualizarTask()}>Atualizar</Button>
          <Button onClick={() => handleDeletarTask(task.id)}>Excluir</Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Card;
