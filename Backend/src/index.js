import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRouters from './routes/web'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

const app = express()
dotenv.config()

configViewEngine(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

initWebRouters(app)

const PORT = process.env.PORT || 8080
const HOSTNAME = process.env.HOSTNAME

app.listen(PORT,HOSTNAME, () => {
    console.log("Backend server is running on the : " + HOSTNAME + ':' + PORT); 
})