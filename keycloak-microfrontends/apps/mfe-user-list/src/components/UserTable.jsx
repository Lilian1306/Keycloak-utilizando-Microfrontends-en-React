

export const UserTable = ({ users, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-blue-200">
        <tr className="border-b">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-blue-200 divide-y divide-gray-500">
        {users.map(user => (
          <tr key={user.id} >
            <td className="px-6 py-4 text-sm text-gray-900">{user.username}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
            <td className="px-6 py-4 text-sm font-medium space-x-2">
              <button 
                onClick={() => onEdit(user)}
                className="rounded-2xl bg-green-600 p-2 text-white shadow transition hover:bg-green-200"
              >
                Editar
              </button>
              <button 
                onClick={() => onDelete(user.id)}
                className="rounded-2xl bg-rose-600 p-2 text-white shadow transition hover:bg-rose-200"
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