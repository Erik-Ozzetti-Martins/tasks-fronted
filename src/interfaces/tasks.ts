import { ReactNode } from "react";

export type ITask = {
  id: string;
  nome: string;
  descricao: string;
  foto?: String;
  url?: string;
};
export type TaskInput = Omit<ITask, "foto">;

export type TaskInputs = Omit<ITask, "url">;

export interface TaskContextdata {
  tasks: ITask[];
  setRefrash: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TaskProviderProps {
  children: ReactNode;
}
