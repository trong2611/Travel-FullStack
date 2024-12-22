import connectDB from "../config/connectMySQLPool"
import { hashPassword, comparePassword} from '../config/hashPassword'

const UserLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const query = "select * from user where email = ?"
        const [result, field] = await connectDB.query(query, [email])
        if(result.length === 0){
            return res.status(404).json({message: 'Người dùng không tồn tại!'})
        }
        const user = result[0]
        const check = comparePassword(password, user.password)
        if(!check){
            return res.status(401).json({message: 'Mật khẩu không chính xác!'})
        }
        // xử lý JWT và trả về 
        const token = {}
        return res.status(200).json({
            message: 'Đăng nhập thành công!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                address: user.address,
                createAt: user.create_at,
                updateAt: user.update_at
            },
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
    }
}

const UserRegister = async(req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ.' });
        }

        const emailCheckQuery = "SELECT * FROM users WHERE email = ?";
        const [existingUser] = await connectDB.query(emailCheckQuery, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email đã tồn tại.' });
        }

        const hashPass = await hashPassword(password);

        const query = "INSERT INTO users (name, email, password, phone, address, role_id) VALUES (?, ?, ?, ?, ?, 1)";
        const [result] = await connectDB.query(query, [name, email, hashPass, phone, address]);

        return res.status(201).json({
            message: 'Đăng ký tài khoản thành công!',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
    }
}


const UserUpdate = async (req, res) => {
    
};


module.exports = {
    UserLogin: UserLogin,
    UserRegister: UserRegister,
    UserUpdate: UserUpdate
}