import { Toaster } from 'react-hot-toast'
import { Route, Routes, useNavigate } from 'react-router'
import './App.css'
import Footer from './components/footer/Footer.jsx'
import Header from './components/header/Header.jsx'
import useAuthUser from './hooks/useAuthUser.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Home from './pages/home/Home.jsx'

function App() {
  const navigate = useNavigate()
  const { authUser, isLoading, isError } = useAuthUser()
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={(authUser && !isLoading && !isError) ? <Dashboard /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
      <Toaster
        toastOptions={{
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: 'green',
              color: 'white',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: 'red',
              color: 'white',
            },
          },
        }}
      />

    </>
  )
}

export default App
