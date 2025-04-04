import React, { useState } from 'react'
import "./add.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


const BACKEND_URL = "https://crud-app-xdkx.onrender.com"; // Thêm biến URL


const Add = () => {

    const users = {
        fname:"",
        lname:"",
        email:"",
        password:""
    }

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    const submitForm = async(e) =>{
        // e.preventDefault();
        // await axios.post("http://localhost:8000/api/create", user)
        // .then((response)=>{
        //     toast.success(response.data.msg, {position:"top-right"})
        //     navigate("/")
        // })
        // .catch(error => console.log(error))
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/create`, user);
            toast.success(response.data.msg, { position: "top-right" });
            navigate("/");
        } catch (error) {
            console.error("Lỗi khi thêm user:", error);
        }
    }

  return (
    <div className='addUser' >
        <Link to={"/"}>Back</Link>
        <h3>Add New User</h3>
        <form className='addUserForm' onSubmit={submitForm}>  
            <div className="inputGroup">
                <label htmlFor="fname">Firt Name: </label>
                <input type="text"onChange={inputHandler} id='fname' name='fname' autoComplete='off' placeholder='First Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Last Name: </label>
                <input type="text"onChange={inputHandler} id='lname' name='lname' autoComplete='off' placeholder='Last Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="fname">Email: </label>
                <input type="email"onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Email' />
            </div>
            <div className="inputGroup">
                <label htmlFor="fname">PassWord: </label>
                <input type="password"onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='PassWord' />
            </div>
            <div className="inputGroup">
            <button type="submit">ADD USER</button>
            </div>
        </form>
    </div>

  )
}

export default Add