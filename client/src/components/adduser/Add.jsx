import React, { useState } from "react";
import "./add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = "https://crud-app-xdkx.onrender.com"; // URL Backend

const Add = () => {
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu có trường nào bỏ trống
        if (!user.fname || !user.lname || !user.email || !user.password) {
            toast.error("Vui lòng nhập đầy đủ thông tin!", { position: "top-right" });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/create`, user);
            toast.success(response.data.msg, { position: "top-right" });
            navigate("/");
        } catch (error) {
            console.error("Lỗi khi thêm user:", error);
            toast.error("Thêm user thất bại. Vui lòng thử lại!", { position: "top-right" });
        }
        setLoading(false);
    };

    return (
        <div className="addUser">
            <Link to={"/"}>Quay lại</Link>
            <h3>Thêm người dùng mới</h3>
            <form className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="fname">Họ:</label>
                    <input
                        type="text"
                        value={user.fname}
                        onChange={inputHandler}
                        id="fname"
                        name="fname"
                        autoComplete="off"
                        placeholder="Nhập họ"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="lname">Tên:</label>
                    <input
                        type="text"
                        value={user.lname}
                        onChange={inputHandler}
                        id="lname"
                        name="lname"
                        autoComplete="off"
                        placeholder="Nhập tên"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={inputHandler}
                        id="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Nhập email"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={inputHandler}
                        id="password"
                        name="password"
                        autoComplete="off"
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <button type="submit" disabled={loading}>
                        {loading ? "Đang xử lý..." : "THÊM NGƯỜI DÙNG"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
