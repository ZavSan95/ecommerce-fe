import { endpoints } from "@/config/api";
import { PaginatedResponse } from "@/interfaces/pagination.interface";
import { User } from "@/interfaces/user.interface";

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

type FetchUserParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

export async function fetchUsers(
  params: FetchUserParams = {}
): Promise<PaginatedResponse<User>> {

  const query = new URLSearchParams();

  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.sort) query.set('sort', params.sort);

  const res = await fetch(
    `${endpoints.users}?${query.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Error al obtener usuarios');
  }

  return res.json();
}


