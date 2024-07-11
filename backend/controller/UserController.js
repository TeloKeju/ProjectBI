import User from '../Models/UserModel.js';
import { createModel, updateModel } from '../Models/UserModel.js';
import bcrypt from "bcrypt"

export const getUser = async (req, res) => {
    try {
        const response = await User.findAll()
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserByID = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const createUser = async (req, res) => {
    const { nama, email, password } = req.body
    const result = await createModel(nama, email, password)
    if (result.status === false) {
        return res.status(401).json(result)
    }
    try {

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt)
        await User.create({
            nama,
            email,
            password: hashPassword
        })
        res.status(201).json({ msg: "user berhasil di buat!" })
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { nama, password } = req.body
        const result = await updateModel(nama, password)
        if (result.status === true) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt)
            await User.update({
                nama,
                password: hashPassword,
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
            res.status(200).json({ msg: "User Berhasil di Update!" })
        } else {
            res.status(200).json(result)
        }

    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "User Berhasil di Hapus!" })
    } catch (error) {
        console.log(error);
    }
}