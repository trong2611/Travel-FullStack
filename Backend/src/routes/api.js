import express from 'express'
import { UserLogin , UserRegister, UserUpdate } from '../controllers/UserController'
import CreateRole from '../controllers/RoleController'
import CreateCategory from '../controllers/CategoryController'
import { GetProviderWithCountTicket } from '../controllers/ProviderController'
import {getTicketTopLike, getTickets, getTicketsCart, getTicketById} from '../controllers/TicketController'

const router = express.Router()

/**
 * 
 * @param {*} app 
 * @returns 
 */
const initWebAPIRouters = (app) => {
    
    router.post('/user-login', UserLogin)
    router.post('/user-register', UserRegister)
    router.put('/user-update', UserUpdate)

    // router.post('/create-ticket')
    // router.post('/create-provider')
    router.post('/create-category', CreateCategory)
    router.post('/create-role', CreateRole)
    router.get('/provider-count-ticket', GetProviderWithCountTicket)
    router.get('/ticket-top-like', getTicketTopLike)
    router.get('/tickets', getTickets)
    router.get('/tickets-cart', getTicketsCart)
    router.get('/ticket/:id', getTicketById)
    return app.use('/api/v1', router)
}

export default initWebAPIRouters