import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Cart = () => {

    const { user } = useContext(AuthContext)

    const { refetch, data: carts = [] } = useQuery({
        queryKey: ['/cart', user],
        queryFn: async () => {
            const res = await fetch(`https://glorious-boa-earrings.cyclic.app/api/v1/cart/${user}`)
            const data = await res.json();
            return data;
        }
    })
    console.log(carts);

    const removeItem = (id) => {
        const sendData = {
            id: id,
        }
        fetch('https://glorious-boa-earrings.cyclic.app/api/v1/cart', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    toast.success('Item delete successfully');
                    refetch()
                } else {
                    toast.error("Something went wrong");
                }
            })
    };


    return (

        <div className="mt-40">
            <h1 className="text-center mb-4 font-semibold text-orange-500 text-2xl">You added total: {carts?.data?.length} Item</h1>
            <div className="overflow-x-auto rounded-xl border border-gray-300 mx-0 md:mx-10">

                <table className="min-w-full table">
                    <thead className="bg-[#F8FAFC]">
                        <tr>
                            <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                <span className="text-black font-semibold text-base">  Product{" "} </span>
                            </th>

                            <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                <span className="text-black font-semibold text-base">  Owner Email{" "} </span>
                            </th>

                            <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                <span className="text-black font-semibold text-base">  Price{" "}</span>
                            </th>

                            <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                <span className="text-black font-semibold text-base"> Color{" "}  </span>
                            </th>

                            <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                <span className="text-black font-semibold text-base">  Size{" "} </span>
                            </th>

                            <th className=" text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                <span className="text-black font-semibold text-base">  Delete{" "} </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                        {
                            carts?.data?.length == 0 ?
                                <h1 className="text-center font-semibold mt-10 text-2xl">You have <strong className="underline">0</strong> item</h1>
                                :
                                carts?.data?.map((item) => (
                                    <tr key={item?._id}>
                                        <td className="text-sm font-medium text-gray-700">
                                            <div className="inline-flex items-center gap-x-3">
                                                <div className="flex flex-col items-center gap-y-2">
                                                    <img
                                                        className="object-cover w-20 h-20 rounded-full"
                                                        src={item?.image}
                                                        alt=""
                                                    />
                                                    <div>
                                                        <h2 className="font-medium text-gray-800  ">
                                                            {item?.title}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="text-sm text-gray-500  whitespace-nowrap">
                                            <p>{item?.owner_email} </p>
                                        </td>
                                        <td className="text-sm whitespace-nowrap">
                                            <h2 className="text-lg font-semibold text-black">
                                                $: {item?.price}
                                            </h2>
                                        </td>
                                        <td className="text-sm whitespace-nowrap">
                                            <h2 className="text-lg font-semibold text-black">
                                                {item?.color}
                                            </h2>
                                        </td>
                                        <td className="text-sm whitespace-nowrap">
                                            <h2 className="text-lg font-semibold text-black">
                                                {item?.size}
                                            </h2>
                                        </td>
                                        <td className="text-sm whitespace-nowrap">
                                            <button onClick={() => removeItem(item?._id)} className="flex justify-center px-4 py-[10px] border-none outline-none rounded-md capitalize text-white bg-red-500 duration-300 hover:bg-red-300 font-semibold">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Cart;
