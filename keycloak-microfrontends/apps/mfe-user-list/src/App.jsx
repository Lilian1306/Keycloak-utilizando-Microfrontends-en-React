import { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import { KEYCLOAK_CONFIG } from './config';

export default function App({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchUsers = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(KEYCLOAK_CONFIG.adminApiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token, refreshTrigger]);

  const handleUserUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (!token) {
    return (
      <div className="bg-yellow-100 p-4 rounded">
        Falta Token de autenticación
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Cargando usuarios...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
      <UserTable 
        users={users} 
        token={token} 
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
}