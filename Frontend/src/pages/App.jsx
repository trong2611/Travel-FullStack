import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "../redux/slices/counterSlice"
import { useEffect } from "react"
import { fetchAllUsers } from "../redux/slices/userSlice"

function App() {

  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)

  const handleIncrease = () => {
    dispatch(increment())
  }

  const handleDecrease = () => {
    dispatch(decrement())
  }

  useEffect(() => {
    dispatch(fetchAllUsers())
  },[])

  const listUser =  useSelector( state => state.user.listUser)
  console.log(listUser)
  
  return (
    <div className="container flex flex-1 flex-col gap-10 justify-center items-center h-screen">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="flex gap-10 justify-center items-center">
        <button className="rounded bg-green-400 py-2 px-5" onClick={() => handleIncrease()}>Increase</button>
        <h2 className="text-xl font-semibold text-blue-500">Count: {count}</h2>
        <button className="rounded bg-green-400 py-2 px-5" onClick={() => handleDecrease()}>Decrease</button>
      </div>
    </div>
  )
}

export default App
