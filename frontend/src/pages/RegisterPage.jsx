import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await api.post("/auth/register", {
                username,
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);

            toast.success("Account created successfully!");
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="text-center mb-4">
                        <h1 className="text-3xl font-bold text-primary">
                            ThinkBoard
                        </h1>
                        <p className="text-base-content/70 mt-2">
                            Create your account
                        </p>
                    </div>

                    <form
                        onSubmit={handleRegister}
                        className="space-y-4"
                    >
                        <div>
                            <label className="label">
                                <span className="label-text">
                                    Username
                                </span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">
                                    Email
                                </span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">
                                    Password
                                </span>
                            </label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""
                                }`}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </form>

                    <div className="divider">OR</div>

                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="link link-primary"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;