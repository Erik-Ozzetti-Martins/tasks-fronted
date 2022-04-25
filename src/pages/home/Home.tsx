import { Button, SimpleGrid } from "@chakra-ui/react";
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
  const totalPage = Math.floor(totalTasks / limit);

  async function handleClick(page: number) {
    const { rows } = await getPageTasks(page, limit);
    setpage(page)
    console.log("response  home", rows);
    addTasks(rows);
  }
  const pages = [...new Array(totalPage)];
  console.log(pages);
  
  /*
  {pages.map((page, index) => {
    let  disabled =  index === page
    return (
      <Button key={index} onClick={() => handleClick(index + 1)} disabled={disabled} bg={disabled ? 'gray.200': 'pink.500' }>
        {index + 1}
      </Button>
    );
  })}
  */
  return (
    <>
      <SimpleGrid minChildWidth="260px" spacing="20px" ml="15">
        {tasks && tasks.map((task) => <Card task={task} key={task.id} />)}
      </SimpleGrid>
      <Pagination   onChangePage={(page) => handleClick(page)} currentPage={page} totalCount={totalTasks}/>
      
    </>
  );
}

export default Home;
