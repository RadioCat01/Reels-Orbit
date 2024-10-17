import axios from "axios";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import './AdminLogin/Admin.css';

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
    <div className="user-management-container">
      <h1 className="title">User List</h1>
      {users && users.length > 0 ? (
        <div className="user-list">
          {users.map((user) => (
            <div key={user.userId} className="user-item">
              <span>{user.userId} - {user.email}</span>
              <button
                className="remove-button"
                onClick={() => removeUser(user.userId)}
              >
                Remove User
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-users">No Users</p>
      )}
    </div>
  )
}

export default Admin
