import { useState } from 'react';
import { KEYCLOAK_CONFIG } from '../config';

export default function useUser({ token }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserById = async (userId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${KEYCLOAK_CONFIG.adminApiUrl}/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching user: ${response.status}`);
            }

            const user = await response.json();
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            setError(error.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };


    const updateUser = async (userId, userData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${KEYCLOAK_CONFIG.adminApiUrl}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    username: userData.username,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    enabled: userData.enabled
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Error updating user';
                
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.errorMessage || errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                
                throw new Error(`${response.status}: ${errorMessage}`);
            }

            return true;
        } catch (error) {
            console.error("Error updating user:", error);
            setError(error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };


    const deleteUser = async (userId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${KEYCLOAK_CONFIG.adminApiUrl}/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = 'Error deleting user';
                
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.errorMessage || errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                
                throw new Error(`${response.status}: ${errorMessage}`);
            }

            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            setError(error.message);
            return false;
        } finally {
            setIsLoading(false);
        }
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