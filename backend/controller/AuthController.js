import User from '../Models/UserModel.js';
import { registerModel, loginModel } from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    const { nama, email, password, confirmPassword } = req.body
    let result = (await registerModel(nama, email, password, confirmPassword))
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)
        if (result.status === true) {
            await User.create({ nama, email, password: hashPassword })
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let result = (await loginModel(email, password))
        if (result.status === false) {
            return res.status(401).json({ result })
        }
        const account = await User.findOne({ where: { email } })
        result.password.error = await bcrypt.compare(password, account.password) ? null : "password salah";
        result.status = (bcrypt.compare(password, account.password, (err, result) => result))
        const payload = {
            id: account.id,
            nama: account.nama,
            email: account.email,
        }
        const secret = process.env.JWT_SECRET
        const expiresIn = 60 * 60 * 2
        const token = jwt.sign(payload, secret, { expiresIn })
        console.log(token)

        return res.status(200).json({
            data: {
                id: payload.id,
                nama: payload.nama,
                email: payload.email
            },
            token
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error);
    }

}
