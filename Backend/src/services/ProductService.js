import { log } from "console"
import connectDB from "../config/connectMySQLPool"

const getProductBySellerId = async (id) => {
    try {
        const query = "SELECT * FROM products WHERE seller_id = ?";
    
        const [products] = await connectDB.query(query, [id]);
        
        if (products.length === 0) {
            return { success: false, message: 'Sản phẩm trống!' };
        }

        return { success: true, products };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Có lỗi xảy ra khi truy vấn!' };
    }
}

const addProduct = async (sellerId, productToAdd) => {
    console.log(productToAdd)
    try {
      const query = `INSERT INTO products (seller_id, name, description, price, stock, image) VALUES (?, ?, ?, ?, ?, ?)`;
  
      const [result] = await connectDB.query(query, [
        sellerId,
        productToAdd.name,
        productToAdd.description,
        productToAdd.price,
        productToAdd.stock,
        productToAdd.image
      ]);
  
      if (result.affectedRows === 1) {
        return { success: true, message: 'Sản phẩm đã được thêm thành công!' };
      } else {
        return { success: false, message: 'Không thể thêm sản phẩm!' };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Có lỗi xảy ra khi thêm sản phẩm!' };
    }
};

const deleteProductById = async (productId, sellerId) => {
    try {
      const query = "DELETE FROM products WHERE id = ?";
      const [result] = await connectDB.query(query, [productId]);
  
      const res = await getProductBySellerId(sellerId)
      if (result.affectedRows === 1) {
        return { success: true, message: 'Sản phẩm đã được xóa thành công!', product: res};
      } else {
        return { success: false, message: 'Không tìm thấy sản phẩm để xóa!' };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Có lỗi xảy ra khi xóa sản phẩm!' };
    }
}

const updateProduct = async (product, sellerId) => {
  try {
    const query = "UPDATE products SET description = ?, price = ?, stock = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
    const [result] = await connectDB.query(query, [product.description, product.price, product.stock, product.id]);

    const res = await getProductBySellerId(sellerId)
    if (result.affectedRows === 1) {
      return { success: true, message: 'Sản phẩm đã được cập nhật thành công!', product: res};
    } else {
      return { success: false, message: 'Không thể cập nhật sản phẩm' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Có lỗi xảy ra khi cập nhật sản phẩm!' };
  }
}

const getProductByRoomId = async (roomId) => {
  try {
    const query = "SELECT * FROM products WHERE ( SELECT seller_id FROM livestreams WHERE id = ? )"
    const query2 = "SELECT * FROM users AS u JOIN livestreams AS l ON u.id = l.seller_id WHERE l.id = ? "
    const [result] = await connectDB.query(query, [roomId])
    const [result2] = await connectDB.query(query2, [roomId])
    return { success: true, products:result, information: result2 }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Có lỗi xảy ra khi cập nhật sản phẩm!' }
  }
}


module.exports = {
    getProductBySellerId: getProductBySellerId,
    addProduct: addProduct,
    deleteProductById: deleteProductById,
    updateProduct: updateProduct,
    getProductByRoomId: getProductByRoomId
}