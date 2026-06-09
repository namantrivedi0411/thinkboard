import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);

            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Login failed"
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
                            Sign in to access your notes
                        </p>
                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-4"
                    >
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
                                placeholder="Enter your password"
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
                                "Login"
                            )}
                        </button>
                    </form>

                    <div className="divider">OR</div>

                    <p className="text-center text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="link link-primary"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;