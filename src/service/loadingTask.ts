import { TASKS_GET } from "./api";

export async function getTasks() {
  const token = window.localStorage.getItem("token");
  if (token) {
    try {
      const { url, options } = TASKS_GET(token);
      const tasksResponse = await fetch(url, options);
      if (!tasksResponse.ok) throw new Error("Token invalido");
      const dados = await tasksResponse.json();
      return dados
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export async function getPageTasks(page:number, limit = 10) {
  const token = window.localStorage.getItem("token");
  if (token) {
    try {
      const { url, options } = TASKS_GET(token, page, limit);
      const tasksResponse = await fetch(url, options);
      if (!tasksResponse.ok) throw new Error("Token invalido");
      const dados = await tasksResponse.json();
      return dados
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
