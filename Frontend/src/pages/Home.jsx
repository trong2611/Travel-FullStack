import skyVideo from "../assets/images/sky.mp4"
import airplane from "../assets/images/air.png"

const Home = () => {

   
    return(
        <section className="py-20 md:py-28 lg:py-48">
            <div className="container">
                {/* landing page */}
                <div className="flex flex-col gap-12 lg:flex-row lg:gap-0">
                    <div className="w-full flex flex-col gap-3 lg:w-1/2 lg:gap-8 home-data">
                        <h1 className="font-teko font-bold text-2xl text-gray-600/80 lg:text-3xl">
                            <span className="font-extrabold text-3xl text-sky-400 lg:text-5xl">Welcome! </span><br/>
                            Let discover the world with 
                            <span className="font-extrabold text-3xl text-sky-400 lg:text-5xl"> T . Travel</span>
                        </h1>
                        <p className="font-rubik font-medium text-gray-600/80 lg:text-lg lg:pr-16">
                        Hãy cùng chúng tôi lên kế hoạch cho những chuyến đi đáng nhớ và đắm chìm trong không gian ấn tượng của du lịch đến mọi nơi trên thế giới. Bắt đầu ngay hôm nay và để<span className="font-teko font-semibold text-2xl text-sky-400"> T . Travel</span> đồng hành cùng bạn trên mỗi chuyến hành trình!
                        </p>
                        <div className="w-full flex items-center gap-10 lg:py-4">
                            <button className="border-2 border-sky-400 rounded-md py-1 px-2 text-sky-400 font-teko font-medium text-lg shadow-md shadow-sky-400 hover:translate-y-1 hover:shadow-none">Khám phá ngay!</button>
                            <button className="border-2 border-sky-400 rounded-md py-1 px-2 bg-sky-400 text-gray-100 font-teko font-medium text-lg shadow-md shadow-gray-400 hover:translate-y-1 hover:shadow-none">Download app <i className="ri-download-line"></i> </button>
                        </div>

                        <div className="flex gap-3 font-semibold text-gray-600 text-xl lg:text-3xl lg:gap-8">
                            <i className="ri-facebook-circle-line cursor-pointer hover:text-blue-600"></i>
                            <i className="ri-twitter-x-line cursor-pointer  hover:text-red-500"></i>
                            <i className="ri-github-fill cursor-pointer  hover:text-purple-500"></i>
                            <i className="ri-instagram-line cursor-pointer  hover:text-orange-400"></i>
                        </div>
                    </div>

                    <div className="flex w-full justify-center items-center relative lg:w-1/2">
                        <div className="rounded-full overflow-hidden">
                            <video autoPlay loop muted playsInline>
                                <source src={skyVideo} type="video/mp4"></source>
                            </video>
                        </div>
                        <img src={airplane} className="absolute w-[95%] -top-4 -right-6 animate-flying md:top-[30%] lg:top-[20%] xl:top-0"/>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </section>
    )
}

export default Home