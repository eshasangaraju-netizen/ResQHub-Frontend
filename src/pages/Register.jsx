import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "CITIZEN"
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/users", form);

            alert("Registration successful!");

            navigate("/");

        } catch (error) {

            alert("Registration failed");

        }
    };

    return (
        <div className="login-container">

            <h1>ResQHub</h1>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="CITIZEN">
                        Citizen
                    </option>

                    <option value="VOLUNTEER">
                        Volunteer
                    </option>
                </select>

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;
