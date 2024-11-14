import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader';

// Password Reset Modal Component
const ForgotPasswordModal = ({ email, onEmailChange, onSendEmail }) => {
    const handleCloseModal = () => document.getElementById('forgot_password_modal').close();

    return (
        <dialog id="forgot_password_modal" className="modal sm:mx-0 mx-2">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Forgot Password</h3>
                <p className="py-4">
                    Enter your email address below, and we’ll send you instructions to reset your password.
                </p>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full"
                        required
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                    <div className="modal-action">
                        <button onClick={onSendEmail} disabled={!email} className="btn btn-primary">
                            Send Email
                        </button>
                        <button type="button" className="btn" onClick={handleCloseModal}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};

// Main Login Component
const Login = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({ email: '', password: '' });

    // Helper for error handling
    const showError = (error) => toast.error(error?.message || "Something went wrong");

    // Login Mutation
    const { mutate: login, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Something went wrong');
            return result;
        },
        onSuccess: () => {
            toast.success('Login success');
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
            navigate('/');
        },
        onError: showError,
    });

    // Password Reset Mutation
    const { mutate: sendPasswordResetEmail, isPending: sendingPassword } = useMutation({
        mutationFn: async (email) => {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Something went wrong');
            return result;
        },
        onSuccess: () => {
            document.getElementById('forgot_password_modal').close();
            toast.success('Email sent successfully');
        },
        onError: showError,
    });

    // Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="py-10 min-h-screen">
            <div className="z-0 flex gap-4 p-4 flex-col-reverse lg:flex-row-reverse items-center justify-evenly">
                {/* Login Form */}
                <div className="card bg-base-100 sm:max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                                name="password"
                                onChange={handleChange}
                            />
                            <label
                                onClick={() => document.getElementById('forgot_password_modal').showModal()}
                                className="label"
                            >
                                <span className="label-text-alt link link-hover">
                                    Forgot password?
                                </span>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={isPending}>
                                {isPending ? <Loader s="sm" /> : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Welcome Section */}
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provide your credentials to login. No account?{' '}
                        <Link to="/signup" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Forgot Password Modal */}
            <ForgotPasswordModal
                email={formData.email}
                onEmailChange={(email) => setFormData((prev) => ({ ...prev, email }))}
                onSendEmail={() => sendPasswordResetEmail(formData.email)}
            />
        </div>
    );
};

export default Login;
