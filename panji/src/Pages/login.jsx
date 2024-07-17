import Header from "../Components/header";
import Footer from "../Components/footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const submit = async () => {
        try {
            const result = await axios.post('http://localhost:5000/api/login',
                { email, password },
            )

            console.log(result.data.token)
            localStorage.setItem('token', result.data.token)
            navigate('/')
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <Header></Header>
            {message}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={submit}>Login</button>

            <Footer></Footer>
        </>)

}

export default login;