import connectDB from "../config/connectMySQLPool"

const getUser = (req, res) => {
    const query = "select * from users"
    connectDB.query(query, (err, result) => {
        console.log(result);
    })
    return res.send("hello home")
}

module.exports = {
    getUser: getUser,
}