import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/users/login", {
                email,
                password
            });

            const user = response.data;

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            if (user.role === "ADMIN") {
                navigate("/admin");
            }
            else if (user.role === "VOLUNTEER") {
                navigate("/volunteer");
            }
            else {
                navigate("/citizen");
            }

        } catch (error) {

            alert("Invalid email or password");

        }
    };

    return (
        <div className="login-container">

            <h1>ResQHub</h1>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>
                Don't have an account?
            </p>

            <button
                onClick={() => navigate("/register")}
            >
                Register
            </button>

        </div>
    );
}

export default Login;
