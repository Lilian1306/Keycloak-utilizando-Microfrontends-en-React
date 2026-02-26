import { useState } from 'react';
import EditUserForm from './EditUserForm';
import DeleteModal from './DeleteModal';
import useUser from '../hooks/useUser';

export default function UserTable({ users, token, onUserUpdated }) {
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  
  const { getUserById, deleteUser, isLoading } = useUser({ token });

  const handleEditClick = async (userId) => {
    setIsLoadingUser(true);
    const userData = await getUserById(userId);
    if (userData) {
      setEditingUser(userData);
    }
    setIsLoadingUser(false);
  };

  const handleEditSuccess = () => {
    setEditingUser(null);
    if (onUserUpdated) {
      onUserUpdated();
    }
  };

  const handleEditCancel = () => {
    setEditingUser(null);
  };

  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };

  const handleDeleteConfirm = async () => {
    if (deletingUser) {
      const result = await deleteUser(deletingUser.id);
      if (result) {
        setDeletingUser(null);
        if (onUserUpdated) {
          onUserUpdated();
        }
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeletingUser(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.enabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.enabled ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => handleEditClick(user.id)}
                  disabled={isLoadingUser || isLoading}
                  className="text-white hover:bg-blue-300 bg-blue-700 px-2 py-1 text-xs font-semibold rounded-full disabled:opacity-50"
                >
                  {isLoadingUser ? 'Cargando...' : 'Editar'}
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  disabled={isLoading}
                  className="text-white hover:bg-red-300 bg-red-600 px-2 py-1 text-xs font-semibold rounded-full disabled:opacity-50"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <EditUserForm
          token={token}
          user={editingUser}
          onSuccess={handleEditSuccess}
          onCancel={handleEditCancel}
        />
      )}

      {deletingUser && (
        <DeleteModal
          user={deletingUser}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}