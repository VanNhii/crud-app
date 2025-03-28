import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from "react-router-dom";

const BACKEND_URL = "https://crud-app-xdkx.onrender.com"; // Cập nhật lại link backend

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/getall`);
                setUsers(response.data);
            } catch (error) {
                toast.error("Lỗi khi lấy dữ liệu từ server!");
                console.error("Lỗi API:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const deleteUser = async (userId) => {
        if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;

        try {
            const response = await axios.delete(`${BACKEND_URL}/api/delete/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            toast.success(response.data.msg, { position: "top-right" });
        } catch (error) {
            toast.error("Lỗi khi xóa user!");
            console.error("Lỗi khi xóa user:", error);
        }
    };

    return (
        <div className="userTable">
            <Link to="/add" className="addButton">
                Thêm Người Dùng
            </Link>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên Người Dùng</th>
                            <th>Email</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {user.fname} {user.lname}
                                    </td>
                                    <td>{user.email}</td>
                                    <td className="actionButtons">
                                        <button onClick={() => deleteUser(user._id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                        <Link to={`/edit/${user._id}`}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ textAlign: "center" }}>
                                    Không có người dùng nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default User;
