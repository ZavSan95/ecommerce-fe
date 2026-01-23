
interface Props {
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  } | null;
}

export const ProfileCard = ({user}: Props) => {

  if(!user) return null;

  return (
    <>
        {/* Card principal */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">

          {/* Header usuario */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Información personal
              </h2>
              <p className="text-sm text-gray-500">
                Datos asociados a tu cuenta
              </p>
            </div>

            {/* Acción futura */}
            <button className="btn-secondary w-fit">
              Editar perfil
            </button>
          </div>

          <div className="w-full h-px bg-gray-200" />

          {/* Datos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Nombre</span>
              <span className="font-medium">{user.name}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Correo electrónico</span>
              <span className="font-medium">{user.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Rol</span>
              <span className="font-medium">{user.roles}</span>
            </div>

          </div>

          <div className="w-full h-px bg-gray-200" />

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-secondary w-full sm:w-auto">
              Cambiar contraseña
            </button>

            <button className="btn-danger w-full sm:w-auto">
              Cerrar sesión
            </button>
          </div>

        </div>
    </>
  );
};