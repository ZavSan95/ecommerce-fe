// interfaces/user-row.interface.ts
export interface UserRow {
  id: string;
  email: string;
  name: string;
  status: 'Activo' | 'Inactivo';
}
