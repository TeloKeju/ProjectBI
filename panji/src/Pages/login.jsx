import Header from "../Components/header";
import Footer from "../Components/footer";
import { useState, useEffect } from "react";
import axios from "axios";

const login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const submit = async () => {
        // axios.post(''.USER_URL, { headers });
        try {

            const result = await axios.post('http://localhost:5000/api/login',
                { email, password },
            )
            // setMessage(result.response.data)
            console.log(result.data.data)

        } catch (err) {
            setMessage(err.response.data.message)
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