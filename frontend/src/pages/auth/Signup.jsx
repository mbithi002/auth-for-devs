import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Loader from '../../components/common/Loader'

const Signup = () => {
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const { mutate: signup, isPending, isError, error } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error) || 'Something went wrong'
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            toast.success("Login successful")
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to login')
        }
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        signup(formData);
    }
    return (
        <div className="py-10 min-h-screen">
            <div className="hero-content flex-col-reverse sm:flex-row gap-10 w-full items-center justify-evenly">
                <div className="card bg-base-100 sm:max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        {
                            isError && (
                                <p className="text-center text-red-500">
                                    {
                                        error.message
                                    }
                                </p>
                            )
                        }
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered"
                                required
                                name='name'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-control">
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
                            {/* <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">
                                {
                                    isPending ? (<Loader s='sm' />) : 'Signup'
                                }
                            </button>
                        </div>
                    </form>
                </div>
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Signup now!</h1>
                    <p className="py-6">
                        Provide your details to register.Already have an account? <Link to={'/login'}><a className="sm:text-xs text-primary hover:underline cursor-pointer">login</a></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup