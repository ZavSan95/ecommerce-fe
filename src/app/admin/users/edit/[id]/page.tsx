import { EditUserForm } from '@/components/admin/users/EditUserForm';
import { getUser } from '@/services/auth.service';

export default async function EditUserPage({ params }: any) {
  const user = await getUser(params.id);

  return (
    <div className="card">
      <EditUserForm
        userId={params.id}
        defaultValues={{
          name: user.name,
          email: user.email,
          role: user.roles?.[0] ?? 'customer',
        }}
      />
    </div>
  );
}
