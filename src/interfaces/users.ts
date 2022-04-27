import { ReactNode } from "react";

export interface UserProviderProps {
  children: ReactNode;
}
export type DataInputLogin = Omit<IUserData, "nome">;

export interface UserContextData {
  data: IUserData | null;
  error: string;
  login: boolean;
  loading: boolean;
  getUser: (token: string) => Promise<void>;
  userLogin: (IData: DataInputLogin) => Promise<void>;
  userLogout: () => Promise<void>;
  userRegister: (IData: IUserData) => Promise<void>;
}

export interface IUserData {
  nome: string;
  email: string;
  password?: string;
}