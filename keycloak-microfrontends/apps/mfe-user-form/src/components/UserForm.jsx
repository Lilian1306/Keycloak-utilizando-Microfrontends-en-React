import { useState, useEffect } from 'react';
import useUsers from '../hooks/useUsers';
import { toast } from 'react-toastify';

const getInitialForm = () => ({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
});

export default function UserForm({ token, onSucess }) {
  const [formData, setFormData] = useState(() => getInitialForm());
  const {createUser, isLoading, error, clearError} = useUsers({token});

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    const result = await createUser(formData);
    if(result) {
      setFormData(getInitialForm());
      toast.success('¡Usuario creado exitosamente en Keycloak!');

      setTimeout(() => {
        onSucess();
      }, 2000);
    }
  };

  useEffect(() => {
    if(error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData(getInitialForm());
    clearError();
  };

  useEffect(() => {
    resetForm();
  }, []);

 return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
      <h3 className="text-lg font-medium mb-4">Crear Nuevo Usuario en Keycloak</h3>

      <form onSubmit={handleSubmit} className="space-y-4" >
        <div>
          <label className="block text-sm font-medium text-gray-700">Usuario *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nombre de usuario único"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
            placeholder="correo@ejemplo.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellido *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            minLength="6"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => {
              resetForm();
              onSucess();
            }}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creando...' : 'Crear Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
}