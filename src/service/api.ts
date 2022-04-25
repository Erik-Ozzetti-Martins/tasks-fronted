export const API_URL = "http://localhost:3333";

export function LOGIN_USER(body: any) {
  return {
    url: `${API_URL}/auth/login/`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function LOGOUT_USER(body: any) {
  return {
    url: `${API_URL}/auth/register/`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET(token: string) {
  return {
    url: `${API_URL}/users/`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

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
