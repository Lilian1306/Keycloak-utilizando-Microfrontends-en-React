import { useState } from 'react';
import { KEYCLOAK_CONFIG } from '../config';
import { toast } from 'react-toastify'

export default function useUser({ token }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const parseErrorMessage = async (response) => {
    try {
      const data = await response.json();
      return data.errorMessage || data.error || `Error ${response.status}: ${response.statusText}`;
    } catch {
      return `Error ${response.status}: ${response.statusText}`;
    }
  };

    const makeRequest = async (url, options, ) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                ...options
            });

            if (!response.ok) {
                const errorMessage = await parseErrorMessage(response);
                setError(errorMessage);
                 if (options.method === 'GET') {
                    toast.error(errorMessage);
                }
                return options.method === "GET" ? null : false; 
            }
            if (options.method === 'GET') {
                return await response.json();
            }
            return true;

        } catch (error) {
            console.error(`Error ${options.method.toLowerCase()}:`, error);
            setError(error.message);
             if (options.method === 'GET') {
                toast.error(error.message);
            }
            return options.method === 'GET' ? null : false;
        } finally {
            setIsLoading(false);
        }
    };

    const getUserById = (userId) => {
        return makeRequest(`${KEYCLOAK_CONFIG.adminApiUrl}/${userId}`, {
            method: 'GET'
        });
    };

    const updateUser = (userId, userData) => {
        return makeRequest(`${KEYCLOAK_CONFIG.adminApiUrl}/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    };

    const deleteUser = (userId) => {
        return makeRequest(`${KEYCLOAK_CONFIG.adminApiUrl}/${userId}`, {
            method: 'DELETE'
        });
    };

    return { 
        getUserById,
        updateUser,
        deleteUser,
        isLoading, 
        error,
        clearError: () => setError(null)
    };
}