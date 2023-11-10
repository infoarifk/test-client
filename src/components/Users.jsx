import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:5000/users')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.deletedCount > 0) {
          alert('Deleted successfully');
          // Refresh the user list after deletion
          fetchData();
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
      console.log(id);
  };

  useEffect(() => {
    fetchData();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup if needed
    };
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  return (
    <div>
      <h3>Logged in users</h3>
      <h1>{users.length}</h1>

      {users.map(user => (
        <p key={user._id}>
          {user.name} : {user.email} <button onClick={() => handleDelete(user._id)}>X</button>
        </p>
      ))}
    </div>
  );
};

export default Users;
