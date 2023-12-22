/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from "../context/AuthProvider";

const AddProduct = ({ setIsAddproduct }) => {

    const { user } = useContext(AuthContext);

    const { register, reset, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            variations: [{ color: '', size: '', quantity: '' }],
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: 'variations',
    });


    const imageHostKey = '14f1e107e329b44a04c4481b2e76451e';

    // post a User details
    const handleDataPost = (data) => {
        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData) {
                    const addProduct = {
                        variation: data?.variations?.map((item) => ({
                            color: item?.color,
                            size: item?.size,
                            quantity: item?.quantity,
                        })),
                        image: imgData.data.url,
                        price: data.price,
                        email: user,
                        title: data?.title,
                        description: data?.description,
                    }
                    fetch('https://glorious-boa-earrings.cyclic.app/api/v1/product', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(addProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success === true) {
                                toast.success('Product added successfully');
                                reset();
                                setIsAddproduct(false);
                                window.location.reload();
                            } else {
                                toast.error("Something went wrong");
                            }
                        })
                }else{
                    toast.error('Please Add A Photo');
                }
            })

    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-30">
            <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">

                <div className="flex items-center justify-between">
                    <h3 className="text-[26px] font-bold text-[#0A0A0A] capitalize" id="modal-title"> New Products </h3>
                    <button className='btn bg-white hover:bg-white border p-1'><RxCross1 onClick={() => setIsAddproduct(false)} size={25}></RxCross1></button>
                </div>

                <h4 className="font-semibold text-[20px] mt-2">Products Information</h4>
                <hr className="mt-2 mb-4" />

                <form onSubmit={handleSubmit(handleDataPost)}>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="title">Title<span className="text-red-500">*</span></label>
                        <input placeholder="Title" {...register("title", { required: 'Title is required' })} id="title" type="text" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                        {errors.title && <p className='text-red-600'>{errors.title?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="image">Main Image<span className="text-red-500">*</span></label>
                        <input placeholder="Main Image" {...register("image", { required: 'Main Image is required' })} id="image" type="file" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                        {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="price">Price<span className="text-red-500">*</span></label>
                        <input placeholder="Price" {...register("price")} id="price" type="number" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                        {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="description">Description</label>
                        <textarea rows={4} placeholder="Description" {...register("description")} id="description" type="text" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold" htmlFor="ads_topBadge">Product Variations</label>
                        {fields.map((variation, index) => (
                            <div key={variation.id} className="grid grid-cols-2 gap-4">
                                <Controller
                                    name={`variations[${index}].color`}
                                    control={control}
                                    render={({ field }) => <input {...field} placeholder="Color" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />}
                                />
                                <Controller
                                    name={`variations[${index}].size`}
                                    control={control}
                                    render={({ field }) => <input {...field} placeholder="Size" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />}
                                />
                                <Controller
                                    name={`variations[${index}].quantity`}
                                    control={control}
                                    render={({ field }) => <input {...field} type="number" placeholder="Quantity" className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl" />}
                                />
                                <button type="button" className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]" onClick={() => append({})}>
                                    Add Variation
                                </button>
                            </div>
                        ))}
                    </div>


                    <div className="flex justify-end mt-6 gap-4">
                        <button onClick={() => setIsAddproduct(false)} className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border">Cancel</button>
                        <button type="Submit" className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-orange-500 rounded-xl hover:bg-orange-400">Create Now</button>
                    </div>


                </form>

            </div>
        </div>
    );
};

export default AddProduct;