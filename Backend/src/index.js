import express from 'express'
import configViewEngine from './config/viewEngine'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import http from 'http'
import { log } from 'console'
import {Login, Register} from './services/LoginServices'
import {getAllRoomLive, createRoom, getRoomById, updateLiveStreamRoom} from './services/LivestreamService'
import {getProductBySellerId, addProduct, deleteProductById, updateProduct, getProductByRoomId} from './services/ProductService'
import { resolve4 } from 'dns/promises'


const app = express()
const server = http.createServer(app);
const io = require('socket.io')(server,{
  cors:{
    origin:'http://localhost:3000',
    methods: ["GET", "POST"]
  }
})

dotenv.config()

const PORT = process.env.PORT || 8080

io.on('connection', (socket) => {

  console.log('Có kết nối mới với socket id:', socket.id)

  // đăng nhập
  socket.on('login', async (data, callback) => {
    console.log('Có user đăng nhập với socket id: ', socket.id)
    const res = await Login(data)
    callback(res)
  })

  // đăng xuất
  socket.on('logout', () => {
    console.log('Có user đăng xuất với socket id: ', socket.id)
  })

  // đăng ký
  socket.on('register', async (data, callback) => {
    console.log('Có user đăng ký với socket id: ', socket.id)
    const res = await Register(data)
    callback(res)
  })

  // lấy sản phẩm của người bán
  socket.on('get-product-by-sellerId', async (userId,callback) => {
    console.log('Có user bán hàng với user id: ', userId)
    const res = await getProductBySellerId(userId)
    // console.log(res)
    callback(res)
  })

  // thêm sản phẩm của người bán
  socket.on('add-product', async (userId, data,callback) => {
    console.log('Có user bán hàng thêm sản phẩm')
    const res = await addProduct(userId, data)
    // console.log(res)
    callback(res)
  })

  // xóa sản phẩm của người bán
  socket.on('delete-product', async (id,userID,callback) => {
    console.log('Có user bán hàng xóa sản phẩm')
    const res = await deleteProductById(id, userID)
    // console.log(res)
    callback(res)
  })

  // cập nhật sản phẩm của người bán
  socket.on('update-product', async (data, userID,callback) => {
    console.log('Có user bán hàng cập nhật sản phẩm')
    const res = await updateProduct(data, userID)
    // console.log(res)
    callback(res)
  })

  // tạo phòng bán hàng
  socket.on('create-room', async (data,userId ,callback) => {
    console.log('Có user bán hàng tạo phòng livestream')
    const res =await createRoom(data, userId)
    socket.broadcast.emit('new-livestream-room')
    // console.log(res)
    callback(res)
  })

  // Người bán dừng phát live
  socket.on('cancer-room', async (roomId, callback) => {
    console.log('Có user bán hàng cancer livestream')
    const res =await updateLiveStreamRoom(roomId)
    socket.broadcast.emit('seller-cancer-room')
    callback(res)
  })

  // Tham gia phòng
  socket.on('join-room', async(roomId, user, callback) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-joined', socket.id)
    const res = await getProductByRoomId(roomId)
    callback(res)
  })

  socket.on(`send-message`, async(data) => {
    console.log(data)
    console.log(socket.id)
    socket.to(data.roomId).emit('new-message', {username: data.username, avatar: data.avatar, message: data.message.text})
  })

  socket.on('offer', (offer, roomId) => {
    console.log(`Server received offer from ${socket.id} in room: ${roomId}`);
    socket.to(roomId).emit('offer', offer, socket.id); // Gửi offer đến toàn bộ người trong phòng
  });
  
  socket.on('answer', (answer, toUser) => {
      console.log(`Server received answer from ${socket.id} to ${toUser}`);
      io.to(toUser).emit('answer', answer); // Gửi trực tiếp đến người gửi offer
  });
  
  socket.on('ice-candidate', (candidate, roomId) => {
      console.log(`Server received ICE candidate from ${socket.id} in room: ${roomId}`);
      socket.to(roomId).emit('ice-candidate', candidate); // Gửi ICE candidate đến phòng
  });

  // lấy tất cả các phòng đang livestream
  socket.on('get-all-room-live', async (callback) => {
    const res = await getAllRoomLive()
    // console.log(res)
    callback(res)
  })

  socket.on('get-room-by-id', async (roomId,callback) => {
    console.log(roomId)
     const res = await getRoomById(roomId)
    // console.log(res)
    callback(res)
  })

  socket.on(`pin-product`, async({roomId, product}) => {
    socket.to(roomId).emit('pined-product', product)
  })

  socket.on(`unpin-product`, async(roomId) => {
    socket.to(roomId).emit('unpined-product')
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  })

})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
