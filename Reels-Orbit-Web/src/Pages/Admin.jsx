import axios from "axios";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import './AdminLogin/Admin.css';
import './Landing.css';

function Admin() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const userAPI_Url = import.meta.env.VITE_USER_API_URL;
  
    useEffect(() => {
        axios.get(`${userAPI_Url}/user`, {withCredentials: true})
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
          .post(`${userAPI_Url}/user/delete`, null, {
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
      return <div className="loading-containerMain">
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
      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => removeUser(user.userId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="no-users">No Users</p>
    )}
  </div>
  )
}

export default Admin
