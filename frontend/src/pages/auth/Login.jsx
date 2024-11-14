import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/common/Loader'

const Login = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { mutate: login, isPending, isError, error } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch("/api/auth/login", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error) || "Something went wrong"
                }
                return data
            } catch (error) {
                throw new Error(error) || "Something went wrong"
            }
        },
        onSuccess: () => {
            toast.success("Login success")
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
            navigate(`/`)
        },
        onError: (error) => {
            toast.error(error.message) || "Something went wrong"
        }
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        login(formData);
    }
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col-reverse lg:flex-row-reverse items-center justify-evenly">
                <div className="card bg-base-100 sm:max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            {
                                isError && <p className="text-red-500 text-center">{error.message}</p>
                            }
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                                name='email'
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
                                name='password'
                                onChange={handleChange}
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">
                                {
                                    isPending ? (
                                        <Loader s='sm' />
                                    ) : 'Login'
                                }
                            </button>
                        </div>
                    </form>
                </div>
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provide your credentials to login.No Account? <Link to={'/signup'}><a className="sm:text-xs text-primary hover:underline cursor-pointer">signup</a></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login