import './App.css'
import Users from './components/Users';

function App() {
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);


    //send data to server: Documentation MDN uploading json data
    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),

    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);

      if(data.insertedId){
        alert('user added successfully');
        form.reset();
      }
    })


  }

  return (
    <>
      <h1>Simple Crud Operation</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" /> <br /> <br />
        <input type="email" name="email" id="" /> <br /> <br />
        <input type="submit" value="add user" />


      </form>

      <Users></Users>
    </>
  )
}

export default App
