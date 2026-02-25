import { useState } from 'react';
import UserForm from './components/UserForm';
import useUsers from './hooks/useUsers';

export default function App({ token, onSuccess }) {
    if (!token) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Token de autenticación no disponible. Por favor, inicia sesión.</p>
        </div>
      </div>
    );
  }
  const { createUser } = useUsers(token);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const success = await createUser(formData);
      if (success) {
        alert('Usuario creado exitosamente');
        if (onSuccess) onSuccess();
      } else {
        alert('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onSuccess) onSuccess();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <UserForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}