import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {

    const { user } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [checkBox, setCheckBox] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkBox == false) {
            toast.error("Please enable checkbox");
        } else {
            const sendData = {
                email: email,
                password: password,
                name: name
            }
            fetch(
                "https://glorious-boa-earrings.cyclic.app/api/v1/userReg",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(sendData),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.success === true) {
                        toast.success("Successfully Registration, Please Log In");
                        navigate("/login");
                    } else {
                        toast.error(data?.message);
                    }
                });
        }
    };

    return (
        <div>
            <section className="bg-[#1F6B6B]">
                <div className="container md:px-6 py-8 mx-auto">
                    <div className="lg:flex gap-4">

                        <div className="lg:w-1/2 hidden md:flex">
                            <div className="text-center">
                                <h2 className="lg:text-[38px] xl:text-[54px] font-normal text-white ">
                                    Welcome to the
                                </h2>
                                <h1 className="xl:text-[54px] lg:text-[38px] text-white font-bold">
                                    Classic It
                                </h1>
                                <p className="text-xl font-normal text-white">
                                    {`This project aims to develop an e-commerce application specifically
            designed for Customer and IIUM communities to provide them with easy
            and convenient access to goods and meals. IIUMeMall will allow
            Customer to order products and meals online and have them delivered
            to their mahallah or other designated location.`}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 lg:w-1/2 lg:mt-0 px-10 ">
                            <div className="form-login pt-[31px] pb-[102px] px-[70px]">
                                <div className="flex justify-center">
                                    <h2 className="text-[30px] text-white font-bold">Sign Up</h2>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mt-[35px]">
                                        <div className="mb-5">
                                            <h6 className="text-base font-semibold text-white mb-3">
                                                Name
                                            </h6>
                                            <input
                                                type="text"
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Your Name "
                                                className="w-full py-2 px-4 outline-none border-none rounded-md font-semibold"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <h6 className="text-base font-semibold text-white mb-3">
                                                Email Address
                                            </h6>
                                            <input
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter Your Email "
                                                className="w-full py-2 px-4 outline-none border-none rounded-md font-semibold"
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <h6 className="text-base font-semibold text-white mb-3">
                                                Password
                                            </h6>
                                            <input
                                                type="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter Your Password "
                                                className="w-full py-2 px-4 outline-none border-none rounded-md font-semibold"
                                            />
                                        </div>
                                        <div className="text-white">
                                            <label>
                                                <input
                                                    onClick={() => setCheckBox(!checkBox)}
                                                    type="checkbox"
                                                    className="accent-[#016170]"
                                                />{" "}
                                                Remember Me
                                            </label>
                                        </div>
                                        <div className="flex justify-center mt-6">
                                            {user == null || user == undefined ? (
                                                <button className="bg-[#009393] text-white w-[227px] py-[12px] rounded-md duration-300 flex justify-center">
                                                    {" "}
                                                    Sign Up
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="bg-[#009393] text-white w-[227px] py-[12px] rounded-md duration-300 flex justify-center"
                                                >
                                                    Logged in
                                                </button>
                                            )}
                                        </div>

                                        <p className="text-center mt-4 text-white">
                                            Already have an account{" "}
                                            <Link to="/login" className="underline text-orange-600">
                                                Please Log In
                                            </Link>{" "}
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;