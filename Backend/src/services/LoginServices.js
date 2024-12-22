import { log } from "console"
import connectDB from "../config/connectMySQLPool"
import { hashPassword, comparePassword} from '../config/hashPassword'
import {sign} from "jsonwebtoken"
import dotenv from 'dotenv'

const Login = async (data) => {
    log(data)
    try {
        const query = "select * from users where email = ?"
        const [result, field] = await connectDB.query(query, [data.email])
        if(result.length === 0){
           return { success: false, message: 'Invalid username or password' }
        }
        const user = result[0]
        const check = comparePassword(data.password, user.password)
        if(!check){
            return { success: false, message: 'Invalid username or password' }
        }
        return { success: true, message: 'Đăng nhập thành công!', user: user}
    } catch (error) {
        console.log(error)
        return { success: false, message: 'Có lỗi xảy ra!' }
    }
}

const Register = async(data) => {
    log(data)
    try {
        const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        const [existingUser] = await connectDB.query(checkEmailQuery, [data.email]);
        if (existingUser.length > 0) {
            return { success: false, message: 'Email đã tồn tại!' }
        }

        const hashPass = await hashPassword(data.password);

        const query = "INSERT INTO users (username, email, password, role, avatar) VALUES (?, ?, ?, ?, ?)";
        const [result] = await connectDB.query(query, [data.username, data.email, hashPass, 'buyer', data.avatar]);

        return { success: true, message: 'Đăng ký thành công!'}

    } catch (error) {
        console.log(error)
        return { success: false, message: 'Có lỗi xảy ra!' }
    }
}

module.exports = {
    Login: Login,
    Register: Register
}