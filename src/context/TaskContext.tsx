import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { ITask } from "interfaces/";
import { getTasks } from "service/loadingTask";
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
    }
    if (token) {
      initialTasks();
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const createdTask = (newTask: ITask) => {
    const newTasks = [...tasks];

    newTasks.pop();
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
