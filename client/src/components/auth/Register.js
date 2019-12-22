import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../contexts/alert/alertContext'
import AuthContext from '../../contexts/auth/AuthContext'

const Register = () => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext
    const { register, error, clearErrors } = authContext

    useEffect(() => {
        if (error === 'User already Exists') {
            setAlert(error, 'danger')
            clearErrors()
        }
    }, [error])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please Enter All Fields', 'danger')
        }
        else if (password !== password2) {
            setAlert("Password didn't match", 'danger')
        }
        else {
            register({ name, email, password })
        }
    }

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div class="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={name}
                    onChange={onChange}/>
                </div>
                
                <div class="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email}
                    onChange={onChange}/>
                </div>
                
                <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password}
                    onChange={onChange}/>
                </div>
                
                <div class="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" id="password2" value={password2}
                    onChange={onChange}/>
                </div>
                
                
                
                <input type="submit" value="register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Register;
