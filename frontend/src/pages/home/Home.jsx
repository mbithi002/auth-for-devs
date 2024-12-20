import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        Impleenting Authentication: credential verification and encryption, secure routing, emailing, credential recovery and much more in one single application.Using MongoDB, Express, Node, React and Mailtrap from emailing.
                    </p>
                    <Link to={'/dashboard'}>
                        <button className="btn btn-primary">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home