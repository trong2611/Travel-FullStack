import {Routes, Route, createBrowserRouter} from "react-router-dom"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Home from "../../pages/Home"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>
    )
}

export default Router