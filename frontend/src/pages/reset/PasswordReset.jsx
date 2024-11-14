import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router'

const PasswordReset = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const { mutate: resetPassword, isPending, isError, error } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/auth/reset-password/${slug}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ password })
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error)
                }
                return data
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            toast.success("password has been reset, please login")
            navigate('/login')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        resetPassword()
    }
    return (
        <div className='min-h-screen p-10'>
            <div className="z-0 flex gap-4 p-4 flex-col-reverse lg:flex-row-reverse items-center justify-evenly">
                {/* Login Form */}
                <div className="card bg-base-100 sm:max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            {
                                isError && <p className='text-red-500 text-center'>{error.message}</p>
                            }
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">
                                {
                                    isPending ? "Saving" : "Reset password"
                                }
                            </button>
                        </div>
                    </form>
                </div>

                {/* Welcome Section */}
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Password reset</h1>
                    <p className="py-6">
                        Provide a new password to update your password.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset