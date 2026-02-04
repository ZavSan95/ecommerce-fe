import { endpoints } from "@/config/api";
import { PaginatedResponse } from "@/interfaces/pagination.interface";
import { User } from "@/interfaces/user.interface";
import { CreateUserPayload } from "@/schemas/create-user.schema";
import { UpdateUserPayload } from "@/schemas/update-user.schema";
import { UserResponse, userResponseSchema } from "@/schemas/user-response.schema";




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
    {
      cache: 'no-store',
      credentials: 'include',
    }
  );

  if (!res.ok) {
    throw new Error('Error al obtener usuarios');
  }

  const json = await res.json();

  return {
    ...json,
    data: json.data.map((user: any) => ({
      id: user._id,          
      email: user.email,
      name: user.name,
      isActive: user.isActive,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })),
  };
}

export async function createUser(
  payload: CreateUserPayload
){

  const res = await fetch(endpoints.createUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? 'Error creando usuario');
  }

  return res.json();
}

export async function updateUser(
  userId: string,
  payload: UpdateUserPayload
){
  const res = await fetch(endpoints.updateUser(userId), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Error actualizando usuario');
  }

  return res.json();
}

export async function getUser(id: string): Promise<UserResponse> {
  const res = await fetch(endpoints.getUser(id), {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Error al buscar usuario');
  }

  const json = await res.json();

  // Validación runtime + tipado real
  const parsed = userResponseSchema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error('Respuesta inválida del servidor (getUser)');
  }

  return parsed.data;
}

export async function toggleStatusUser(id: string) {
  const res = await fetch(endpoints.toggleUserStatus(id), {
    method: 'PATCH',
    credentials: 'include',
  });

  if(!res.ok){
    throw new Error('Error al cambiar estado');
  }

  return res.json();
}

export async function deleteUser(id: string){
  
}