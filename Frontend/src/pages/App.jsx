import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "../redux/slices/counterSlice"
import { useEffect } from "react"
import { fetchAllUsers } from "../redux/slices/userSlice"
import Router from "../components/Router/Router"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

function App() {

  // const dispatch = useDispatch()
  // const count = useSelector((state) => state.counter.value)

  // useEffect(() => {
  //   dispatch(fetchAllUsers())
  // },[])

  // const listUser =  useSelector( state => state.user.listUser)
  // console.log(listUser)

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <Router />
      <Footer />
    </div>
  )
  
}

export default App
