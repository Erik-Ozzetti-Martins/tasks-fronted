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

export interface ICardProps {
  setRefrash?: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
}

export interface UserProviderProps {
  children: ReactNode;
}
export type DataInput = Omit<IData, "nome">;

export interface UserContextData {
  data: IData | null;
  error: string;
  login: boolean;
  loading: boolean;
  getUser: (token: string) => Promise<void>;
  userLogin: (IData: DataInput) => Promise<void>;
  userLogout: () => Promise<void>;
  userRegister: (IData: IData) => Promise<void>;
}

export interface IData {
  nome: string;
  email: string;
  password?: string;
}

export interface TaskContextdata {
  tasks: ITask[];
  setRefrash: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TaskProviderProps {
  children: ReactNode;
}
