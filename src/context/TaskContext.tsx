import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ITask } from "../interfaces/interfaces";
import { getTasks } from "../service/loadingTask";
interface TaskContextData {
  tasks: ITask[];
  totalTasks: number;
  addTasks: (tasks: ITask[]) => void;
  createdTask: (task: ITask) => void;
  updatedTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

const TaskContext = createContext({} as TaskContextData);

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    async function initialTasks() {
      const response = await getTasks();
      setTasks(response.rows);
      setTotalTasks(response.count);
      console.log(response);
    }
    if (token) {
      initialTasks();
    } else {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("mudou");
    console.log(tasks);
  }, [tasks]);

  const createdTask = (newTask: ITask) => {
    const newTasks = [...tasks];

    newTasks.push(newTask);

    setTasks([...newTasks]);
  };

  function updatedTask(task: ITask) {
    const newTasks: ITask[] = [...tasks];
    const updetedTask = newTasks.map((newTask) => {
      if (String(newTask.id) === String(task.id)) {
        return {
          ...newTask,
          id: task.id,
          nome: task.nome,
          descricao: task.descricao,
          url: task.url,
        };
      }
      return newTask;
    });

    setTasks(updetedTask);
  }

  function addTasks(tasks: ITask[]) {
    setTasks((prevState) => [...tasks]);
  }

  function deleteTask(id: string) {
    const newTasks = [...tasks];
    const taskDeletada = newTasks.filter((task: ITask) => task.id !== id);
    console.log("deletada", taskDeletada);
    setTasks([...taskDeletada]);
  }

  /*
  async function getTasks() {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const { url, options } = TASKS_GET(token);
        const tasksResponse = await fetch(url, options);
        if (!tasksResponse.ok) throw new Error("Token invalido");
        const dados = await tasksResponse.json();
        setTasks(dados.rows);
        setTotalTasks(dados.count);
      } catch (error: any) {
        throw new Error(error);
      }
    } else {
      return navigate("");
    }
  }
*/

  return (
    <TaskContext.Provider
      value={{
        tasks,
        updatedTask,
        deleteTask,
        createdTask,
        totalTasks,
        addTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useContextTask() {
  const context = useContext(TaskContext);
  return context;
}

/*
import { useNavigate } from "react-router-dom";
import {
  TaskContextdata,
  TaskInputs,
  TaskProviderProps,
} from "../interfaces/interfaces";
import { TASKS_GET } from "../service/api";

export const TaskContext = React.createContext<TaskContextdata>(
  {} as TaskContextdata
);

export const TaskStorage = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<TaskInputs[]>([]);
  const [refresh, setRefrash] = useState<boolean>(false);
  const navigate = useNavigate();

  async function getTasks() {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const { url, options } = TASKS_GET(token);
        const tasksResponse = await fetch(url, options);
        if (!tasksResponse.ok) throw new Error("Token invalido");
        const dados = await tasksResponse.json();
        setTasks(dados);
      } catch (error: any) {
        throw new Error(error);
      }
    } else {
      return navigate("/login");
    }
  }

  React.useEffect(() => {
    getTasks();
  }, [navigate, refresh]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setRefrash,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
*/
