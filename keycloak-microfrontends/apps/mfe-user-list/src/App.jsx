import { useEffect } from 'react';
import useUser from './hooks/useUser';
import { UserTable } from './components/UserTable';

const UserList = ({ token }) => {
  const { users, loading, fetchUsers, deleteUser } = useUser({token});

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar usuario?")) {
      await deleteUser(id);
    }
  };

  if (loading) return <div className="p-10 text-center">Cargando...</div>;

  return (
    <div className="bg-blue-200 rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
      </div>
      <UserTable 
        users={users} 
        onEdit={(user) => console.log("Editar", user)} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default UserList;