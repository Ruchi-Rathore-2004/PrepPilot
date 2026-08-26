import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Navbar from '../../../components/Navbar'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
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
                    <h1>Welcome Back</h1>
                    <p style={{ marginTop: '-0.75rem', marginBottom: '0.5rem' }}>Sign in to continue your interview preparation</p>
                    <form onSubmit={handleSubmit}>
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
                        <button style={{ marginTop: '0.5rem' }} className='button primary-button'>Login</button>
                    </form>
                    <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
                </div>
            </main>
        </>
    )
}

export default Login