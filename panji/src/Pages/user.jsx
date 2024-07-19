import Header from "../Components/header";
import Footer from "../Components/footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const User = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const getUser = async () => {
        const result = await axios.get("http://localhost:5000/api/users", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        setUsers(result.data)
    }

    useEffect(() => {
        getUser()
    }, [])

    const deleteUser = async (key) => {
        const result = await axios.delete(`http://localhost:5000/api/users/${key}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        console.log(result)
        getUser()
    }
    const updateUser = async (key) => {

        navigate(`/users/update/${key}`)

        // const result = await axios.patch(`http://localhost:5000/api/users/${key}`)

    }

    return (
        <>
            <Header></Header>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.nama}</td>
                            <td>{user.email}</td>
                            <td>{user.createdAt}</td>
                            <td>{user.updatedAt}</td>
                            <td>
                                {user.id}
                                <button onClick={() => updateUser(user.id)}>update</button>
                                <button onClick={() => deleteUser(user.id)}>hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer></Footer>
        </>
    )



}

export default User;