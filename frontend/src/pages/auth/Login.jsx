import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col-reverse lg:flex-row-reverse items-center justify-evenly">
                <div className="card bg-base-100 sm:max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
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