import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get('http://localhost:8080/Security', { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setLoading(false); 
            })
            .catch(() => {
                setUser(null); 
                setLoading(false); 
            });
    }, []);

    
    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? <Outlet/>:<Navigate to="/"/>
}

export default ProtectedRoutes 
