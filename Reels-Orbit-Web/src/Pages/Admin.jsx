import axios from "axios";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";


function Admin() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
     
        axios.get("http://localhost:8081/user", {withCredentials: true})
        .then(response => {
            if(response.data){
                setUsers(response.data);
                console.log(response.data);
            }else{
                setUsers(null);
            };
            setLoading(false);
        }).catch(()=>{
            setUsers(null);
            setLoading(false);
        })
    }, []);
  
    if (loading) {
      return <div className="loading-container">
      <InfinitySpin 
        height="200" 
        width="200" 
        color="#ffffff" 
        ariaLabel="loading" 
      />
    </div>; 
    }

  return (
    <div>
      <h1>User List</h1>
        {users.map((user) => (
          <p key={user.userId}>
           {user.userId} - {user.email}
          </p>
        ))}
    </div>
  )
}

export default Admin
