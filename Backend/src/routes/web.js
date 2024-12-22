import express from 'express'
import {hashPassword} from '../config/hashPassword'

const router = express.Router()

/**
 * 
 * @param {*} app 
 * @returns 
 */
const initWebRouters = (app) => {
    
    router.get('/', (req, res) => {
        res.send('hello')
    })

    return app.use('/', router)
}

export default initWebRouters