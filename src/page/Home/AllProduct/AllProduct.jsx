import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllProduct = () => {

    const { data: products = [] } = useQuery({
        queryKey: ['/api/v1/product'],
        queryFn: async () => {
            const res = await fetch(`https://glorious-boa-earrings.cyclic.app/api/v1/product`)
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className="my-12">
            <div className='text-center'>
                <h2 className='text-2xl font-bold'>Popular Products for Daily Shopping</h2>
                <p className='text-gray-500 mt-2'>See all our popular products in this week. You can choose your daily needs <br /> products from this list and get some special offer with free shipping.</p>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 my-6 md:mx-4 mx-0">
                {
                    products?.data?.map(product => <div key={product?.productId} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
                        <div className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md flex items-center justify-center" > <img src={product?.image} alt="" /> </div>

                        <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                            <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{product?.title}</h3>

                            <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                                <span className="font-bold text-gray-800 dark:text-gray-200">$ {product?.price}</span>
                                <Link to={`productDetails/${product?.productId}`}><button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">See Details</button></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllProduct;