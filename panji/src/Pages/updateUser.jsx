import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const updateUser = () => {
    const { id } = useParams()

    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')

    const [msgNama, setMsgNama] = useState('')
    const [msgEmail, setMsgEmail] = useState('')

    const getUser = async () => {
        const result = await axios.get(`http://localhost:5000/api/users/${id}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        setNama(result.data.nama)
        setEmail(result.data.email)
    }
    useEffect(() => {
        getUser()
    })

    const submit = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.patch(`http://localhost:5000/api/users/${id}`, {
                nama, email
            },)

        } catch (err) {
            console.log(err.message)
        }
    }




    return (
        <>
            <form action="">
                <label htmlFor="">
                    nama
                </label>
                <input type="text" value={nama} onChange={(e) => { setNama(e.target.value) }} />

                <label htmlFor="">
                    email
                </label>
                <input type="email" value={email} disabled />
                <button type="submit" onClick={submit}>submit</button>
            </form>
        </>
    )
}

export default updateUser;