import { Link } from "react-router-dom"
import { useState } from "react"

const listNav = [
    {name: 'Home' , link: '/'},
    {name: 'Tours' , link: '/tours'},
    {name: 'Pages' , link: '/pages'},
    {name: 'Blog' , link: '/blog'},
    {name: 'Contact' , link: '/contact'},
]
const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="fixed w-full top-0 left-0 z-50 backdrop-blur-lg">
            <nav className="container flex items-center justify-between h-16 sm:h-20">
                <div className="sm:text-2xl lg:text-3xl 2xl:text-4xl">
                    <Link to='/' className="text-sky-400 font-extrabold font-rubik" id="logo">T . Travel</Link>
                </div>

                <div id="nav-menu" className={`absolute top-0 overflow-hidden flex-col min-h-[100vh] w-full bg-slate-100/95 backdrop-blur-sm flex items-center justify-center duration-300 gap-8 lg:static lg:bg-transparent lg:backdrop-blur-none lg:w-auto lg:flex-row lg:gap-32 ${isMenuOpen ? 'left-[0]' : 'left-[100%]'}`}>
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {
                            listNav.map((item) => (
                                <Link key={item.name} to={item.link} className="text-xl font-bold duration-300 text-sky-400 hover:text-sky-700 lg:font-medium lg:text-lg lg:text-gray-500/80 lg:hover:text-sky-400 lg:hover:underline" onClick={() => setIsMenuOpen(!isMenuOpen)}>{item.name}</Link>
                            ))
                        }
                    </div>

                    <div className="flex bg-sky-400 rounded px-4 py-1 hover:bg-sky-400/20 lg:bg-transparent lg:border-2 lg:border-sky-400 lg:rounded-lg shadow-md shadow-sky-400 hover:translate-y-1 hover:shadow-none">
                        <Link className="text-xl font-bold duration-300 text-white hover:text-sky-400 lg:text-sky-400 lg:text-xl lg:font-medium ">Đăng nhập</Link>
                    </div>
                </div>

                <div className="text-xl sm:text-3xl cursor-pointer z-50 text-sky-400 lg:hidden">
                    <i id="hamburger" className= {isMenuOpen ? "ri-close-line" : "ri-menu-4-line"} onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
                </div>
            </nav>
        </header>
    )
}

export default Header