import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";


const Main = () => {
    return (
        <div className="min-h-screen w-full h-full">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <div className="mt-24">
                <Outlet></Outlet>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Main;