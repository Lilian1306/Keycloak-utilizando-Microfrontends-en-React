export const UserTable = ({ users, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map(user => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
            <td className="px-6 py-4 text-sm font-medium space-x-2">
              <button 
                onClick={() => onEdit(user)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button 
                onClick={() => onDelete(user.id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);