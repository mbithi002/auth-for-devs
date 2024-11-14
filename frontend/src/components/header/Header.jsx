import React, { useEffect } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { Link } from 'react-router-dom';
import useAuthUser from '../../hooks/useAuthUser';

const Header = () => {
    const { authUser } = useAuthUser();
    useEffect(() => { }, [authUser]);

    return (
        <>
            <div className="navbar bg-base-200 justify-between fixed top-0 left-0 z-40 w-full shadow-md">
                {/* Mobile Drawer */}
                <div className="drawer drawer-end sm:hidden grid">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button">
                            <CiMenuFries />
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            {/* Sidebar content here */}
                            {!authUser && (
                                <>
                                    <Link to={'/signup'}>
                                        <li><a>Signup</a></li>
                                    </Link>
                                    <Link to={'/login'}>
                                        <li><a>Login</a></li>
                                    </Link>
                                </>
                            )}
                            {authUser && (
                                <>
                                    <Link to={'/dashboard'}>
                                        <li><a>Dashboard</a></li>
                                    </Link>
                                    <li className="text-center text-base-200 bg-red-500">
                                        <a>Logout</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Logo */}
                <div className="sm:flex-1">
                    <Link to={'/'}>
                        <a className="btn btn-ghost text-xl">Auth</a>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 sm:inline-flex hidden">
                        {authUser && (
                            <Link to={`/dashboard`}>
                                <li>
                                    <a>Dashboard</a>
                                </li>
                            </Link>
                        )}
                        {!authUser && (
                            <>
                                <Link to={'/signup'}>
                                    <li>
                                        <a className="cursor-pointer hover:bg-green-500 hover:text-base-200 transition-all duration-150">
                                            Signup
                                        </a>
                                    </li>
                                </Link>
                                <Link to={'/login'}>
                                    <li>
                                        <a className="cursor-pointer hover:bg-primary hover:text-base-100 transition-all duration-150">
                                            Login
                                        </a>
                                    </li>
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Content Padding */}
            <div className="pt-16">
                {/* Your page content goes here */}
            </div>
        </>
    );
};

export default Header;
