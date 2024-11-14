import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const userId = 'sjdjsd283y7288318g81-8y'
    return (
        <div className="navbar bg-base-200">
            <div className="flex-1">
                <Link to={'/'}>
                    <a className="btn btn-ghost text-xl">Auth</a>
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 sm:inline-flex hidden">
                    <li>
                        <details>
                            <summary>Profile</summary>
                            <ul className="bg-base-100 rounded-t-none p-2 w-40">
                                <li><a>Password reset</a></li>
                                <li><a>Verify Email</a></li>
                                <li><a>Delete Account</a></li>
                            </ul>
                        </details>
                    </li>
                    <Link to={'/signup'}>
                        <li>
                            <a className='cursor-pointer hover:bg-green-500 hover:text-base-200 transition-all duration-150'>
                                Signup
                            </a>
                        </li>
                    </Link>
                    <Link to={'/login'}>
                        <li>
                            <a className='cursor-pointer hover:bg-primary hover:text-base-100 transition-all duration-150'>
                                Login
                            </a>
                        </li>
                    </Link>
                    <Link to={`/dashboard/${userId}`}>
                        <li>
                            <a>
                                Dashboard
                            </a>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Header