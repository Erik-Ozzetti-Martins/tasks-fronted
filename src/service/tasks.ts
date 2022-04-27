import { API_URL } from "service";

export function TASKS_GET(token: string, page = 1, limit = 10) {
  return {
    url: `${API_URL}/tasks/?page=${page}&limit=${limit} `,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function TASK_POST(formData: FormData, token: string | null) {
  return {
    url: `${API_URL}/tasks/`,
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
}

export function TASK_PUT(
  formData: FormData,
  token: string | null,
  id: string | undefined
) {
  return {
    url: `${API_URL}/tasks/${id}`,
    options: {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  };
}

export function TASK_GET(token: string, id: string | undefined) {
  return {
    url: `${API_URL}/tasks/${id}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function TASK_DELETE(id: string, token: string) {
  return {
    url: `${API_URL}/tasks/${id}`,
    options: {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}
