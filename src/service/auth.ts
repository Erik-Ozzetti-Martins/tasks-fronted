import { API_URL } from "service";

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