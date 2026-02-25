import { useCallback, useState } from "react"
import { KEYCLOAK_CONFIG} from '../config';


export default function useUser({token}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_URL = KEYCLOAK_CONFIG.adminApiUrl; 

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setUsers(data);
        }catch(error) {
            console.error("Error getching users:", error);
        } finally {
            setLoading(false);
        }
    }, [token, API_URL]);

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`${API_URL}/${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}`}
            });
            if( response.ok) {
                setUsers(prev => prev.filter(u => u.id !== userId));
                return true; 
            }
        }catch(error){
            console.error("Error deleting user:", error);
            return false;
        }
    }
    return { users, loading, fetchUsers, deleteUser };
}
