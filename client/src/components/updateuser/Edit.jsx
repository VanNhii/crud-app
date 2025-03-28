import React, { useEffect, useState } from "react";
import "../adduser/add.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = "https://crud-app-xdkx.onrender.com"; // Cập nhật URL backend

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({ fname: "", lname: "", email: "" });
    const [loading, setLoading] = useState(true);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        if (!id) {
            toast.error("ID không hợp lệ!");
            navigate("/");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/getone/${id}`);
                setUser(response.data);
            } catch (error) {
                toast.error("Lỗi khi lấy dữ liệu người dùng!");
                console.error("Lỗi API:", error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, navigate]);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BACKEND_URL}/api/update/${id}`, user);
            toast.success(response.data.msg, { position: "top-right" });
            navigate("/");
        } catch (error) {
            toast.error("Lỗi khi cập nhật user!");
            console.error("Lỗi khi cập nhật user:", error);
        }
    };

    return (
        <div className="addUser">
            <Link to="/">Quay lại</Link>
            <h3>Cập nhật người dùng</h3>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <form className="addUserForm" onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label htmlFor="fname">Họ: </label>
                        <input
                            type="text"
                            value={user.fname}
                            onChange={inputChangeHandler}
                            id="fname"
                            name="fname"
                            autoComplete="off"
                            placeholder="Họ"
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="lname">Tên: </label>
                        <input
                            type="text"
                            value={user.lname}
                            onChange={inputChangeHandler}
                            id="lname"
                            name="lname"
                            autoComplete="off"
                            placeholder="Tên"
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={inputChangeHandler}
                            id="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <button type="submit">Cập nhật</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Edit;
