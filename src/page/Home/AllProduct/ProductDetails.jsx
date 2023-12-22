import { useState, useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const { user } = useContext(AuthContext);
    const { data } = useLoaderData();

    const { description, title, price, productId, email, image, variation } = data;

    const [selectedVariation, setSelectedVariation] = useState(null);

    const handleCartAdd = () => {
        if (selectedVariation) {
            const senddata = {
                owner_email: email,
                user_email: user,
                productId,
                variationId: selectedVariation?.variation_id,
                image,
                price,
                title,
                color: selectedVariation?.color,
                size: selectedVariation?.size
            }
            fetch('https://glorious-boa-earrings.cyclic.app/api/v1/cart', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(senddata)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        toast.success('Product add in cart successfully');
                        window.location.reload();
                    } else {
                        toast.error("Something went wrong");
                    }
                })
        } else {
            toast.error("Please select a variation");
        }
    };

    return (
        <div className="mt-28">
            <Link to='/'>
                <button className="btn bg-orange-500 hover:bg-orange-300 text-white ml-10 mb-8">Go Back</button>
            </Link>
            <div className="flex md:items-start items-center justify-between card md:card-side bg-base-100 shadow-xl xl:mx-40 lg:mx-32 md:mx-10 mx-0 md:p-10 p-4">
                <div>
                    <div className="flex items-center gap-6">
                        <figure><img src={image} alt="Album" className="w-[200px]" /></figure>
                        <div>
                            <h2 className="card-title">{title}</h2>
                            <h2 className="card-title">$ {price}</h2>
                        </div>
                    </div>

                    <p className="mt-4">{description}</p>
                </div>
                <div>
                    <select
                        className="select border rounded-lg h-10 w-full text-orange-500 mb-8 text-[20px]"
                        onChange={(e) => {
                            const selectedOption = e.target.value;
                            const selectedVariationData = variation.find(item =>
                                `Color: ${item.color} and Size: ${item.size}` === selectedOption
                            );
                            setSelectedVariation(selectedVariationData);
                        }}
                    >
                        <option disabled selected>Select Variation</option>
                        {variation?.map(item =>
                            <option
                                key={item?.variation_id}
                                className="text-orange-500"
                            >
                                Color: {item?.color} and Size: {item?.size}
                            </option>)
                        }
                    </select>
                    <div className="flex items-center md:justify-end justify-center">
                        {
                            user ?
                                <button onClick={() => handleCartAdd()} className="btn bg-orange-500 hover:bg-orange-300 text-white">Add To Cart</button>
                                :
                                <Link to='/login'><button className="btn bg-orange-500 hover:bg-orange-300 text-white">Log In First</button></Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
