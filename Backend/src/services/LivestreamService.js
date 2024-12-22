import { log } from "console"
import connectDB from "../config/connectMySQLPool"

const getAllRoomLive = async () => {
    try {
        const query = "SELECT * FROM livestreams WHERE status = ?";
    
        const [liveRooms] = await connectDB.query(query, ['live']);
        
        if (liveRooms.length === 0) {
            return { success: false, message: 'Không có phòng livestream nào đang hoạt động!' };
        }

        return { success: true, liveRooms };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Có lỗi xảy ra khi truy vấn phòng livestream!' };
    }
}

const createRoom = async (data, sellerId) => {
    try {
      const query = `INSERT INTO livestreams (seller_id, title, description, status, image) VALUES (?, ?, ?, ?, ?)`;
  
      const [result] = await connectDB.query(query, [
        sellerId,
        data.title,
        data.description,
        'live',
        data.image
      ])

      const livestreamId = result.insertId
  
      if (result.affectedRows === 1) {
        return { success: true, message: 'Tạo phòng thành công thành công!', roomId: livestreamId };
      } else {
        return { success: false, message: 'Không thể tạo phòng!' };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Có lỗi xảy ra khi tạo phòng!' };
    }
}

const getRoomById = async(roomId) => {
    try {
        const query = "SELECT l.*, u.*   FROM livestreams l JOIN users u ON l.seller_id = u.id WHERE l.id = ?";
    
        const [liveRooms] = await connectDB.query(query, [roomId]);
        
        if (liveRooms.length === 0) {
            return { success: false, message: 'Không có phòng livestream nào đang hoạt động!' };
        }

        return { success: true, liveRooms };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Có lỗi xảy ra khi truy vấn phòng livestream!' };
    }
}

const updateLiveStreamRoom = async(roomId) => {
  try {
    const query = `UPDATE livestreams SET status = (?) WHERE id = (?)`;
  
    const [result] = await connectDB.query(query, ['ended',roomId])
  
    return { success: true, message: 'Thoát phòng thành công thành công!'};
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Có lỗi xảy ra !' };
  }
}

module.exports = {
    getAllRoomLive: getAllRoomLive,
    createRoom: createRoom,
    getRoomById: getRoomById,
    updateLiveStreamRoom: updateLiveStreamRoom
}
