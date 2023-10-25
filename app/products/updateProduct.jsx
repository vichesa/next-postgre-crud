"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const UpdateProduct = ({ product, brands }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [brandId, setBrandId] = useState(product.brandId);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.patch(`api/products/${product.id}`, {
      title: title,
      price: Number(price),
      brandId: Number(brandId),
    });
    setTitle("");
    setPrice("");
    setBrandId("");
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Update
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="font-bold text-lg">Update {product.title}</h1>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Product name</label>
              <input
                type="text"
                className="input input-bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                className="input input-bordered"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a brand
                </option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
