import Header from "../Components/header";
import Footer from "../Components/footer";
import axios from "axios";
import { useState, useEffect } from "react";


const User = () => {
    const [users, setUsers] = useState([])

    // console.log(localStorage.getItem("token"))
    useEffect(() => {
        const user = async () => {
            const result = await axios.get("http://localhost:5000/api/users", {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            setUsers(result.data)
        }
        user()
    }, [])


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
                                <button>update</button>
                                <button>hapus</button>
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