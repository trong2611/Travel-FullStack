import connectDB from "../config/connectMySQLPool";

const CreateRole = async(req, res) => {
    try {
        console.log(req.body);
        const {name} = req.body
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const query = "INSERT INTO roles (name) VALUES (?)";
        const [result, field] = await connectDB.query(query, [name])
        return res.status(200).json({
            message: 'Tạo mới role thành công!',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
    }
}

export default CreateRole