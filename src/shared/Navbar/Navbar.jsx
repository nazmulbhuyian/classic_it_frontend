

import { FaBars } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { useContext, useRef, useState } from 'react';
import SideNavbar from '../SideNavbar/SideNavbar';
import logo from '../../assets/classicLogo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../page/context/AuthProvider';
import AddProduct from '../../page/AddProduct/AddProduct';

const Navbar = () => {

    const { user } = useContext(AuthContext);

    const [sidebarShow, setSidebarShow] = useState(false);
    const sidebarRef = useRef(null);

    const handleLogOut = () => {
        localStorage.removeItem('lluMeMallLoginToken');
        window.location.reload();
    }

    const [isAddProduct, setIsAddproduct] = useState(false);

    return (
        <div className="bg-[#F85606] p-4">
            <div className="lg:flex lg:items-center lg:gap-[50px]">

                <div className="flex justify-between items-center w-full">
                    {/* show for mobile device bars */}
                    <div className="flex items-center gap-[20px] md:hidden">
                        {/* menubar */}
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setSidebarShow(!sidebarShow)}
                            ref={sidebarRef}
                        >
                            <FaBars className="text-white cursor-pointer text-[24px]" />
                            <div
                                className={
                                    sidebarShow
                                        ? "-left-5 absolute top-full mt-10  duration-300"
                                        : "-left-96 absolute top-full mt-6  duration-300"
                                }
                            >
                                <div className="min-w-[200px] h-full z-50 shadow-lg py-[20px] px-[15px] bg-white dark:bg-darkWhite border-r border-[#f4f4f4] dark:border-darkBg">
                                    <SideNavbar />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="flex md:hidden items-center gap-2 rounded-lg border border-[#E7E7E7] bg-white px-[10px]">
                        <BiSearch className="text-[#717171]" size={25} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-none w-full outline-none text-[18px]"
                        />
                    </div>

                    <div className="flex items-center">
                        <Link to='/'><img src={logo} alt="logo" className='w-16 h-16 rounded-full' /></Link>
                    </div>

                    <div className="md:flex hidden items-center gap-2 rounded-lg border border-[#E7E7E7] bg-white px-[10px]">
                        <BiSearch className="text-[#717171]" size={25} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-none w-full outline-none text-[18px]"
                        />
                    </div>

                    <div className="md:flex items-center gap-4 md:gap-4 relative hidden">
                        <Link to='/' className='text-white font-semibold hover:underline'>Home</Link>
                        {
                            user ?
                                <>
                                    <Link to='/cart' className='text-white font-semibold hover:underline'>Cart</Link>
                                    <button onClick={() => setIsAddproduct(!isAddProduct)} className='text-white font-semibold hover:underline'>Add Product</button>
                                    <button onClick={() => handleLogOut()} className='text-white font-semibold hover:underline'>Log Out</button>
                                </>
                                :
                                <>
                                    <Link to='/register' className='text-white font-semibold hover:underline'>Sign Up</Link>
                                    <Link to='/login' className='text-white font-semibold hover:underline'>Log In</Link>
                                </>
                        }
                    </div>

                </div>
            </div>
            {
                isAddProduct == true && <AddProduct setIsAddproduct={setIsAddproduct} />
            }
        </div>
    );
};

export default Navbar;