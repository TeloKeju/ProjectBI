import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import validator from "validator";
import bcrypt from 'bcrypt';

const { DataTypes } = Sequelize;

const User = db.define("users",
    {
        "nama": DataTypes.STRING,
        "email": DataTypes.STRING,
        "password": DataTypes.STRING,
    },
    { freezeTableName: true }
)

const registerModel = async (nama, email, password, confirmPassword) => {
    const findEmail = await User.findOne({ where: { email } })
    return {
        nama: {
            value: nama,
            error: (!validator.isByteLength(nama, { min: 4, max: 16 })) ? "Field Nama minimal berisi 4 - 16 Karakter " : null,
        },
        email: {
            value: email,
            error: (findEmail) ? "Email sudah terdaftar" : (!validator.isEmail(email)) ? "Email tidak Valid" : null,
        },
        password: {
            value: password,
            error: (!validator.isByteLength(password, { min: 8, max: 16 })) ? "Password harus berisi 8 sampai 16 Karakter" : null
        },
        confirmPassword: {
            value: confirmPassword,
            error: (!validator.equals(confirmPassword, password)) ? "Confirm Password tidak sama" : null
        },
        status: (
            (!validator.isByteLength(nama, { min: 4, max: 16 })) ||
            (!findEmail) ||
            (!validator.isEmail(email)) ||
            (!validator.isByteLength(password, { min: 8, max: 16 })) ||
            (!validator.equals(confirmPassword, password))
        )
    }
};

const loginModel = async (email, password) => {
    const { count } = await User.findAndCountAll({ where: { email } })
    let credentials = {
        email: {
            value: email,
            error: (count === 0) ? "Email belum terdaftar" : null,
        },
        password: {
            value: password,
            error: null
        },
        status: (count === 0)
    }
    // console.log(rows)

    return credentials
}

const createModel = async (nama, email, password) => {
    const findEmail = await User.findOne({ where: { email } })
    return {
        nama: {
            value: nama,
            error: (!validator.isByteLength(nama, { min: 4, max: 16 })) ? "Field Nama minimal berisi 4 - 16 Karakter " : null,
        },
        email: {
            value: email,
            error: (findEmail) ? "Email sudah terdaftar" : (!validator.isEmail(email)) ? "Email tidak Valid" : null,
        },
        password: {
            value: password,
            error: (!validator.isByteLength(password, { min: 8, max: 16 })) ? "Password harus berisi 8 sampai 16 Karakter" : null
        },
        status: (
            (!validator.isByteLength(nama, { min: 4, max: 16 })) ||
            (!findEmail) ||
            (!validator.isEmail(email)) ||
            (!validator.isByteLength(password, { min: 8, max: 16 }))
        )
    }
}

const updateModel = (nama, password) => {
    return {
        nama: {
            value: nama,
            error: (!validator.isByteLength(nama, { min: 4, max: 16 })) ? "Field Nama minimal berisi 4 - 16 Karakter " : null,
        },
        password: {
            value: password,
            error: (!validator.isByteLength(password, { min: 8, max: 16 })) ? "Password harus berisi 8 sampai 16 Karakter" : null
        },
        status: (validator.isByteLength(nama, { min: 4, max: 16 }) || (validator.isByteLength(password, { min: 8, max: 16 })))
    }
}


export default User;
export { registerModel, loginModel, createModel, updateModel }

(async () => {
    await db.sync()
})()