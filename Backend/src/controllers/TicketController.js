import connectDB from "../config/connectMySQLPool";

const CreateTicket = async(req, res) => {

}

const getTicketTopLike = async(req, res) => {
    try {
        const query = `SELECT t.id AS ticket_id,t.name AS ticket_name,AVG(r.rating) AS average_rating,(SELECT i.image_url FROM images i WHERE i.ticket_id = t.id  ORDER BY i.id ASC  LIMIT 1) AS ticket_image FROM tickets t JOIN reviews r ON t.id = r.ticket_id GROUP BY t.id, t.name ORDER BY average_rating DESC LIMIT 5;`;
        
        const [result] = await connectDB.query(query);

        return res.status(200).json({
            message: 'Lấy 5 vé nhiều lượt thích nhất thành công!',
            ticket: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
    }
}

const getTickets = async(req, res) => {
    try {
        const query = `select * from tickets`;
        
        const [result] = await connectDB.query(query);

        return res.status(200).json({
            message: 'Lấy tickets thành công!',
            ticket: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
    }
}

const getTicketsCart = async(req, res) => {
    try {
        const query = `SELECT t.id AS ticket_id,t.name AS ticket_name,t.price AS ticket_price,AVG(r.rating) AS average_rating,COUNT(r.rating) AS total_ratings,p.name AS provider_name,(SELECT i.image_url FROM images i WHERE i.ticket_id = t.id ORDER BY i.id ASC LIMIT 1) AS ticket_image FROM tickets t LEFT JOIN reviews r ON t.id = r.ticket_id LEFT JOIN providers p ON t.provider_id = p.id GROUP BY t.id, t.name, t.price, p.name ORDER BY t.create_at DESC;`;
        
        const [result] = await connectDB.query(query);

        return res.status(200).json({
            message: 'Lấy tickets thành công!',
            ticket: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
    }

}

const getTicketById = async(req, res) => {
    try {
        const {id} = req.params
        const query = `SELECT t.*,  AVG(r.rating) AS average_rating,COUNT(r.rating) AS total_ratings,p.*,  GROUP_CONCAT(DISTINCT c.name) AS categories,  GROUP_CONCAT(DISTINCT i.image_url) AS images  FROM tickets t LEFT JOIN reviews r ON t.id = r.ticket_id LEFT JOIN providers p ON t.provider_id = p.id LEFT JOIN category_ticket tc ON t.id = tc.ticket_id  LEFT JOIN categories c ON tc.category_id = c.id LEFT JOIN images i ON t.id = i.ticket_id  WHERE t.id = ${id} GROUP BY t.id, p.id;`;
        
        const [result] = await connectDB.query(query);

        return res.status(200).json({
            message: 'Lấy tickets thành công!',
            ticket: result[0],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
    }

}

module.exports = {
    getTicketTopLike: getTicketTopLike,
    getTickets:getTickets,
    getTicketsCart: getTicketsCart,
    getTicketById: getTicketById
}