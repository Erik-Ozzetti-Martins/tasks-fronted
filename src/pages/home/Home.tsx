import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "../../components/cards/Card";

import { Pagination } from "../../components/pagination/Pagination";
import { useContextTask } from "../../context/TaskContext";
import { getPageTasks } from "../../service/loadingTask";

function Home() {
  const { tasks, totalTasks, addTasks } = useContextTask();
  const [page, setpage] = useState(1);
  useEffect(() => {}, [tasks]);
  const limit = 10;

  async function handleClick(page: number) {
    const { rows } = await getPageTasks(page, limit);
    setpage(page);
    console.log("response  home", rows);
    addTasks(rows);
  }

  return (
    <>
      <SimpleGrid minChildWidth="260px" spacing="20px" ml="15" mb="16">
        {tasks && tasks.map((task) => <Card task={task} key={task.id} />)}
      </SimpleGrid>
      <Box display="flex" justifyContent="center" mt="4">
        <Pagination
          onChangePage={(page) => handleClick(page)}
          currentPage={page}
          totalCount={totalTasks}
        />
      </Box>
    </>
  );
}

export default Home;
