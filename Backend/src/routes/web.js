import express from 'express'
import {getUser} from '../controllers/homeController'

const router = express.Router()

/**
 * 
 * @param {*} app 
 * @returns 
 */
const initWebRouters = (app) => {
    
    router.get('/', getUser)

    return app.use('/', router)
}

export default initWebRouters