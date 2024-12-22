const { default: connectDB } = require("../config/connectMySQLPool");

const GetProviderWithCountTicket = async (req, res) => {
    try {
        const query = "SELECT p.id AS provider_id, p.name AS provider_name, p.image AS provider_image, COUNT(t.id) AS total_tickets FROM providers p LEFT JOIN tickets t ON p.id = t.provider_id GROUP BY p.id, p.name;"
        const [result, field] = await connectDB.query(query)
        
        return res.status(200).json({
            message: 'OK',
            provider: result
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
    }
}

module.exports = {
    GetProviderWithCountTicket:GetProviderWithCountTicket
}