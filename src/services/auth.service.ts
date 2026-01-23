import { endpoints } from "@/config/api";

interface LoginResponse {
    user: {
        id: string;
        email: string;
        name: string;
        roles: string[];
    };
}

export async function loginRequest(email: string, password: string) {
  const res = await fetch(endpoints.login, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return res.json(); // { user }
}

export async function authMe() {
  const res = await fetch(endpoints.me, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Not authenticated');
  }

  return res.json(); // { user }
}

export async function logoutRequest(){
  const res = await fetch(endpoints.logout, {
    method: 'POST',
    credentials: 'include',
  });

  if(!res.ok){
    throw new Error('Error al cerrar sesión');
  }

  return res.json();
}


