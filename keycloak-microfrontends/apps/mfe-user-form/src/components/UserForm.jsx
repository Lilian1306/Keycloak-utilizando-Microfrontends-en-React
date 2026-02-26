import { useState, useEffect } from 'react';
import useUsers from '../hooks/useUsers';

const Initial_Form = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
};

export default function UserForm({ token, onSucess }) {
  const [formData, setFormData] = useState(Initial_Form);

  const [success, setSuccess] = useState('');
  const {createUser, isLoading, error, clearError} = useUsers({token});

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setSuccess('');

    const result = await createUser(formData);
    if(result) {
      setFormData(Initial_Form);
      setSuccess('¡Usuario creado exitosamente en Keycloak!');

      setTimeout(() => {
        onSucess();
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
   setFormData(Initial_Form);
  }, []);

 return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
      <h3 className="text-lg font-medium mb-4">Crear Nuevo Usuario en Keycloak</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded">
          {success}
        </div>
      )}

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
            onClick={() => onSucess()}
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