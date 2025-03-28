import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import "./user.css"
import { Link } from 'react-router-dom'

const BACKEND_URL = "https://crud-app-xdkx.onrender.com"; // câp nhật lại đường link backend

const User = () => {

    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        const fetchData = async()=>{
           // const response = await axios.get(`"http://localhost:8000/api/getall"`)
           const response = await axios.get(`${BACKEND_URL}/api/getall`);
            setUsers(response.data);

        }

        fetchData();
    }, [])

    const deleteUser = async(userId) => {
        // await axios.delete(`http://localhost:8000/api/delete/${userId}`)
        // .then((response)=>{
        //     setUsers((prevUser)=> prevUser.filter((user)=>  user._id !== userId))
        //     toast.success(response.data.msg, {position: 'top-right'})
            
        // }).catch((error)=>{
        //     console.log(error);
            
        // })
        try {
            const response = await axios.delete(`${BACKEND_URL}/api/delete/${userId}`);
            setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
            toast.success(response.data.msg, { position: 'top-right' });
        } catch (error) {
            console.error("Lỗi khi xóa user:", error);
        }
    }

    return (
    <div className = 'userTable'>
        <Link to={"/add"} className='addButton'>Add User</Link>
        
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>
                                {user.fname} {user.lname}
                            </td>
                            <td>{user.email}</td>
                            <td className='actionButtons'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={'/edit/'+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                        )
                    }) 
                }

            </tbody>
        </table>
    </div>
  )
}

export default User