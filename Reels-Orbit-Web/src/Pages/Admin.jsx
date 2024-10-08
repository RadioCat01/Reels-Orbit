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

    const removeUser = (userId) => {
        axios
          .post("http://localhost:8081/user/delete", null, {
            params: { userId: userId },
            withCredentials: true,
          })
          .then(() => {
            setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
          })
          .catch((error) => {
            console.error("Error removing user:", error);
          });
      };
  
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
    {users && users.length > 0 ? (
      users.map((user) => (
        <p key={user.userId}>
          {user.userId} - {user.email}
          <button onClick={() => removeUser(user.userId)}>Remove User</button>
        </p>
      ))
    ) : (
      <p>No Users</p> 
    )}
  </div>
  )
}

export default Admin
