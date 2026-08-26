import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"
import Navbar from '../../../components/Navbar'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")

    const { loading, handleRegister } = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        const res = await handleRegister({ username, email, password })
        if (res && res.user) {
            navigate("/")
        } else if (res && res.error) {
            setErrorMessage(res.error)
        } else {
            setErrorMessage("Registration failed. Please try again.")
        }
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <main className="auth-page">
                    <div className="loading-spinner"></div>
                </main>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <main className="auth-page">
                <div className="form-container">
                    <h1>Create Account</h1>
                    <p style={{ marginTop: '-0.75rem', marginBottom: '0.5rem' }}>Join PrepPilot for personalized interview plans</p>

                    {errorMessage && (
                        <div style={{
                            padding: '0.75rem 1rem',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            borderRadius: '0.6rem',
                            color: '#F87171',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}>
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Enter username' required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='Enter email address' required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='Enter password' required />
                        </div>

                        <button style={{ marginTop: '0.5rem' }} className='button primary-button'>Register</button>

                    </form>

                    <p>Already have an account? <Link to={"/login"}>Login</Link></p>
                </div>
            </main>
        </>
    )
}

export default Register