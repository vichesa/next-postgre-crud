"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteProduct = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (productId) => {
    await axios.delete(`api/products/${productId}`);

    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h1 className="font-bold text-lg">Delete Product</h1>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              Close
            </button>
            <button
              type="submit"
              onClick={() => handleDelete(product.id)}
              className="btn btn-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
