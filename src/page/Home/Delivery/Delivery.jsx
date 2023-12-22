import { FaApple } from "react-icons/fa";
import { FcAndroidOs } from "react-icons/fc";
import second from '../..//../assets/left.png'
import first from '../..//../assets/right.png'

const Delivery = () => {
    return (
        <div>
            <div className="hero bg-slate-100 mt-16 mb-8 p-16">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={second} className="rounded-lg" alt='' width='450px' />
                    <div>
                        <h1 className="text-3xl font-bold">Get Your Daily Needs From Our Classic IT Store</h1>
                        <p className="py-6 text-center">There are many products you will find our shop, Choose your daily necessary product from our Classic IT shop and get some special offer.</p>
                        <div className="flex items-center justify-center">
                            <button className="btn bg-black text-white border-none"><FaApple size={30}></FaApple> App Store</button>
                            <button className="btn bg-black ml-3 text-white border-none"><FcAndroidOs size={30}></FcAndroidOs> Play Store</button>
                        </div>
                    </div>
                    <img src={first} className="rounded-lg" alt='' width='450px' />
                </div>
            </div>
        </div>
    );
};

export default Delivery;